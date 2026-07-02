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
        // Check if a cached CV profile exists in the session
        $cachedProfile = $request->session()->get('cv_matching_profile');
        $useCachedCv   = $cachedProfile && ! $request->hasFile('resume');

        $validated = $request->validate([
            // Resume is only required when there is no cached CV to fall back to
            'resume'     => ($useCachedCv ? 'nullable' : 'required') . '|file|mimes:pdf|max:10240',
            'cover_note' => 'nullable|string',
        ]);

        if ($useCachedCv) {
            // Option B: copy the cached file to a new unique path so this application
            // has its own isolated copy of the resume.
            $sourcePath = $cachedProfile['resume_path'];
            $extension  = pathinfo($sourcePath, PATHINFO_EXTENSION) ?: 'pdf';
            $destPath   = 'resumes/' . Str::uuid() . '.' . $extension;

            if (Storage::disk('public')->exists($sourcePath)) {
                Storage::disk('public')->copy($sourcePath, $destPath);
                $path = $destPath;
            } else {
                // Cached file no longer on disk — fall through and require a new upload
                return back()->withErrors(['resume' => 'Your cached CV could not be found. Please upload your resume again.']);
            }
        } else {
            // Normal upload path
            $path = $request->file('resume')->store('resumes', 'public');
        }

        // Generate a unique quiz token
        $token = Str::uuid()->toString();

        // Create the application record
        $application = $job->applications()->create([
            'user_id'     => $request->user()?->id,
            'resume_path' => $path,
            'cover_note'  => $validated['cover_note'] ?? null,
            'quiz_token'  => $token,
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