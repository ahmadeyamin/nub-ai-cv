<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Services\CVAnalysisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ApplicationController extends Controller
{

    public function store(Request $request, Job $job, CVAnalysisService $analyzer)
    {
        $validated = $request->validate([
            'resume' => 'required|file|mimes:pdf|max:2048',
            'cover_note' => 'nullable|string',
        ]);

        $path = $request->file('resume')->store('resumes', 'public');

        // Analyze CV
        $analysis = $analyzer->analyze($path, $job->description);

        $job->applications()->create([
            'user_id' => $request->user()->id,
            'resume_path' => $path,
            'cover_note' => $validated['cover_note'],
            'ai_score' => $analysis['score'],
            'ai_analysis' => $analysis,
        ]);

        return back()->with('success', 'Application submitted successfully!');
    }

}