<?php

namespace App\Http\Controllers;

use App\Models\QuizAnswer;
use App\Models\QuizSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    // -------------------------------------------------------------------------
    // Helper: Find session or abort
    // -------------------------------------------------------------------------
    private function findSession(string $token): QuizSession
    {
        return QuizSession::with(['application.job', 'questions', 'answers'])
            ->where('token', $token)
            ->firstOrFail();
    }

    // -------------------------------------------------------------------------
    // GET /quiz/{token}
    // Main entry point — shows waiting screen or start screen based on status
    // -------------------------------------------------------------------------
    public function show(string $token)
    {
        $session = $this->findSession($token);

        // Auto-expire if timer has run out
        if ($session->isExpired()) {
            $this->forceComplete($session);
        }

        return match ($session->status) {
            'pending'     => Inertia::render('Quiz/Waiting', [
                'token'          => $token,
                'questionsCount' => $session->questions_count,
            ]),
            'ready'       => Inertia::render('Quiz/Start', [
                'token'          => $token,
                'candidateName'  => $session->application->name ?? 'Candidate',
                'jobTitle'       => $session->application->job->title ?? 'the position',
                'questionsCount' => $session->questions_count,
                'timeLimitMins'  => $session->getTimeLimitMinutes(),
            ]),
            'in_progress' => $this->redirectToCurrentQuestion($session),
            'completed', 'expired' => redirect()->route('quiz.result', $token),
            default       => abort(404),
        };
    }

    // -------------------------------------------------------------------------
    // GET /quiz/{token}/status  (JSON — polled by waiting screen)
    // -------------------------------------------------------------------------
    public function status(string $token)
    {
        $session = QuizSession::where('token', $token)->firstOrFail();

        return response()->json([
            'status'          => $session->status,
            'questionsCount'  => $session->questions_count,
        ]);
    }

    // -------------------------------------------------------------------------
    // POST /quiz/{token}/start
    // -------------------------------------------------------------------------
    public function start(string $token)
    {
        $session = QuizSession::where('token', $token)->firstOrFail();

        // Guard: only allow starting a 'ready' session
        if ($session->status !== 'ready') {
            return redirect()->route('quiz.show', $token);
        }

        $session->update([
            'status'     => 'in_progress',
            'started_at' => now(),
            'expires_at' => now()->addMinutes($session->getTimeLimitMinutes()),
        ]);

        $session->application->update(['quiz_status' => 'in_progress']);

        return redirect()->route('quiz.question', ['token' => $token, 'n' => 1]);
    }

    // -------------------------------------------------------------------------
    // GET /quiz/{token}/question/{n}
    // -------------------------------------------------------------------------
    public function question(string $token, int $n)
    {
        $session = $this->findSession($token);

        // Auto-expire check
        if ($session->isExpired()) {
            $this->forceComplete($session);
            return redirect()->route('quiz.result', $token);
        }

        // Guard: must be in_progress
        if ($session->status !== 'in_progress') {
            return redirect()->route('quiz.show', $token);
        }

        $question = $session->questions()->where('question_number', $n)->firstOrFail();

        // Check if already answered
        $existingAnswer = $session->answers()->where('quiz_question_id', $question->id)->first();
        if ($existingAnswer) {
            // Skip to next unanswered question
            return $this->redirectToCurrentQuestion($session);
        }

        return Inertia::render('Quiz/Question', [
            'token'          => $token,
            'question'       => [
                'id'             => $question->id,
                'number'         => $question->question_number,
                'text'           => $question->question_text,
                'option_a'       => $question->option_a,
                'option_b'       => $question->option_b,
                'option_c'       => $question->option_c,
                'option_d'       => $question->option_d,
            ],
            'totalQuestions' => $session->questions_count,
            'expiresAt'      => $session->expires_at?->toISOString(),
            'answeredCount'  => $session->answers()->count(),
        ]);
    }

    // -------------------------------------------------------------------------
    // POST /quiz/{token}/answer
    // -------------------------------------------------------------------------
    public function answer(Request $request, string $token)
    {
        $session = QuizSession::where('token', $token)->firstOrFail();

        // Auto-expire check
        if ($session->isExpired()) {
            $this->forceComplete($session);
            return redirect()->route('quiz.result', $token);
        }

        if ($session->status !== 'in_progress') {
            return redirect()->route('quiz.show', $token);
        }

        $validated = $request->validate([
            'question_id'     => 'required|integer|exists:quiz_questions,id',
            'selected_option' => 'required|in:a,b,c,d',
        ]);

        $question = $session->questions()->findOrFail($validated['question_id']);

        // Prevent double-answering
        $alreadyAnswered = $session->answers()->where('quiz_question_id', $question->id)->exists();
        if (!$alreadyAnswered) {
            $isCorrect = $question->correct_option === $validated['selected_option'];

            QuizAnswer::create([
                'quiz_session_id'  => $session->id,
                'quiz_question_id' => $question->id,
                'selected_option'  => $validated['selected_option'],
                'is_correct'       => $isCorrect,
            ]);
        }

        // Check if all questions answered
        $answeredCount = $session->answers()->count();
        if ($answeredCount >= $session->questions_count) {
            $this->completeQuiz($session);
            return redirect()->route('quiz.result', $token);
        }

        // Find next unanswered question
        $nextQuestion = $session->questions()
            ->whereDoesntHave('answer', function ($q) use ($session) {
                $q->where('quiz_session_id', $session->id);
            })
            ->orderBy('question_number')
            ->first();

        if (!$nextQuestion) {
            $this->completeQuiz($session);
            return redirect()->route('quiz.result', $token);
        }

        return redirect()->route('quiz.question', ['token' => $token, 'n' => $nextQuestion->question_number]);
    }

    // -------------------------------------------------------------------------
    // GET /quiz/{token}/result
    // -------------------------------------------------------------------------
    public function result(string $token)
    {
        $session = QuizSession::with([
            'application.job',
            'questions.answer',
        ])
        ->where('token', $token)
        ->firstOrFail();

        // Auto-complete if expired but not yet finalized
        if ($session->isExpired() || ($session->status === 'in_progress')) {
            $this->completeQuiz($session);
            $session->refresh();
        }

        if (!in_array($session->status, ['completed', 'expired'])) {
            return redirect()->route('quiz.show', $token);
        }

        $questions = $session->questions->map(function ($q) use ($session) {
            $answer = $q->answer;
            return [
                'number'          => $q->question_number,
                'text'            => $q->question_text,
                'option_a'        => $q->option_a,
                'option_b'        => $q->option_b,
                'option_c'        => $q->option_c,
                'option_d'        => $q->option_d,
                'correct_option'  => $q->correct_option,
                'selected_option' => $answer?->selected_option,
                'is_correct'      => $answer?->is_correct ?? false,
            ];
        });

        return Inertia::render('Quiz/Result', [
            'token'          => $token,
            'candidateName'  => $session->application->name ?? 'Candidate',
            'jobTitle'       => $session->application->job->title ?? 'the position',
            'score'          => $session->score ?? 0,
            'passed'         => $session->passed ?? false,
            'totalQuestions' => $session->questions_count,
            'correctCount'   => $session->answers()->where('is_correct', true)->count(),
            'questions'      => $questions,
            'timeTaken'      => $session->started_at && $session->completed_at
                ? $session->started_at->diffInSeconds($session->completed_at)
                : null,
        ]);
    }

    // -------------------------------------------------------------------------
    // Private helpers
    // -------------------------------------------------------------------------

    private function redirectToCurrentQuestion(QuizSession $session)
    {
        $nextQuestion = $session->questions()
            ->whereDoesntHave('answer', function ($q) use ($session) {
                $q->where('quiz_session_id', $session->id);
            })
            ->orderBy('question_number')
            ->first();

        if ($nextQuestion) {
            return redirect()->route('quiz.question', [
                'token' => $session->token,
                'n'     => $nextQuestion->question_number,
            ]);
        }

        $this->completeQuiz($session);
        return redirect()->route('quiz.result', $session->token);
    }

    private function completeQuiz(QuizSession $session): void
    {
        $session->refresh();

        if (in_array($session->status, ['completed', 'expired'])) {
            return;
        }

        $correctCount   = $session->answers()->where('is_correct', true)->count();
        $totalQuestions = $session->questions_count;
        $score          = $totalQuestions > 0 ? (int) round(($correctCount / $totalQuestions) * 100) : 0;
        $passed         = $score >= 60;

        $session->update([
            'status'       => 'completed',
            'completed_at' => now(),
            'score'        => $score,
            'passed'       => $passed,
        ]);

        $session->application->update(['quiz_status' => 'completed']);
    }

    private function forceComplete(QuizSession $session): void
    {
        if (in_array($session->status, ['completed', 'expired'])) {
            return;
        }

        // Fill unanswered questions with null (mark as incorrect)
        $answeredIds = $session->answers()->pluck('quiz_question_id');
        $unanswered  = $session->questions()->whereNotIn('id', $answeredIds)->get();
        foreach ($unanswered as $q) {
            QuizAnswer::create([
                'quiz_session_id'  => $session->id,
                'quiz_question_id' => $q->id,
                'selected_option'  => null,
                'is_correct'       => false,
            ]);
        }

        $this->completeQuiz($session);
    }
}
