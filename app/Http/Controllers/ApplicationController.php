<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessApplicationAndGenerateQuiz;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    public function store(Request $request, Job $job)
    {
        $validated = $request->validate([
            'resume'     => 'required|file|mimes:pdf|max:2048',
            'cover_note' => 'nullable|string',
        ]);

        // Store the uploaded resume
        $path = $request->file('resume')->store('resumes', 'public');

        // Generate a unique quiz token
        $token = Str::uuid()->toString();

        // Create the application record
        $application = $job->applications()->create([
            'user_id'    => $request->user()?->id,
            'resume_path' => $path,
            'cover_note' => $validated['cover_note'] ?? null,
            'quiz_token' => $token,
            'quiz_status' => 'pending',
        ]);

        // Create the quiz session (pending — waiting for AI to generate questions)
        $application->quizSession()->create([
            'token'           => $token,
            'status'          => 'pending',
            'questions_count' => $job->quiz_questions_count,
        ]);

        // Dispatch the background job (CV analysis + question generation)
        ProcessApplicationAndGenerateQuiz::dispatch($application);

        // Redirect candidate to the quiz waiting page
        return redirect()->route('quiz.show', ['token' => $token]);
    }
}