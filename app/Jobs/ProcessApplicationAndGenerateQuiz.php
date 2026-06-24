<?php

namespace App\Jobs;

use App\Models\Application;
use App\Models\QuizQuestion;
use App\Services\CVAnalysisService;
use App\Services\QuizGenerationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Throwable;

class ProcessApplicationAndGenerateQuiz implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels;

    public int $tries = 2;
    public int $timeout = 180; // 3 minutes for AI calls

    public function __construct(
        public readonly Application $application
    ) {}

    public function handle(CVAnalysisService $cvAnalyzer, QuizGenerationService $quizGenerator): void
    {
        $application  = $this->application;
        $quizSession  = $application->quizSession;
        $job          = $application->job;

        // ---------- Step 1: Analyze the CV ----------
        $analysis = $cvAnalyzer->analyze($application->resume_path, $job->description);

        // Update application with CV analysis results and create/update candidate profile
        $candidate = \App\Models\Candidate::updateOrCreate(
            ['email' => $analysis['email']],
            [
                'user_id'      => $application->user_id,
                'name'         => $analysis['name'],
                'phone'        => $analysis['phone'] ?? null,
                'resume_path'  => $application->resume_path,
                'skills'       => $analysis['skills'] ?? [],
                'experience'   => $analysis['experience'] ?? [],
                'education'    => $analysis['education'] ?? [],
                'summary'      => $analysis['summary'] ?? null,
                'raw_analysis' => $analysis,
            ]
        );

        $application->update([
            'name'         => $analysis['name']  ?? null,
            'email'        => $analysis['email'] ?? null,
            'ai_score'     => $analysis['score'] ?? null,
            'ai_analysis'  => $analysis,
            'candidate_id' => $candidate->id,
        ]);

        // ---------- Step 2: Generate Quiz Questions ----------
        $count     = $quizSession->questions_count;
        $questions = $quizGenerator->generate(
            jobTitle:       $job->title,
            jobDescription: $job->description,
            cvAnalysis:     $analysis,
            count:          $count
        );

        // ---------- Step 3: Save questions to DB ----------
        foreach ($questions as $index => $q) {
            QuizQuestion::create([
                'quiz_session_id' => $quizSession->id,
                'question_number' => $index + 1,
                'question_text'   => $q['question_text'],
                'option_a'        => $q['option_a'],
                'option_b'        => $q['option_b'],
                'option_c'        => $q['option_c'],
                'option_d'        => $q['option_d'],
                'correct_option'  => strtolower($q['correct_option']),
            ]);
        }

        // ---------- Step 4: Mark quiz as ready ----------
        $quizSession->update(['status' => 'ready']);
        $application->update(['quiz_status' => 'ready']);
    }

    public function failed(Throwable $exception): void
    {
        // Mark quiz session as failed so the candidate sees an error
        $this->application->quizSession?->update(['status' => 'expired']);
        $this->application->update(['quiz_status' => 'failed']);

        \Illuminate\Support\Facades\Log::error('Quiz generation failed for application #' . $this->application->id, [
            'error' => $exception->getMessage(),
        ]);
    }
}
