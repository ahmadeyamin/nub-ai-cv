<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function index(Request $request)
    {
        $query = Candidate::query()->with(['applications.job', 'applications.quizSession']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('skills', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%");
            });
        }

        $candidates = $query->latest()->get();

        return Inertia::render('Candidates/Index', [
            'candidates' => $candidates,
            'filters' => $request->only(['search']),
        ]);
    }

    public function downloadResume(Candidate $candidate)
    {
        if (!$candidate->resume_path || !Storage::disk('public')->exists($candidate->resume_path)) {
            abort(404, 'Resume file not found.');
        }

        $filename = Str::slug($candidate->name) . '-resume.pdf';
        return Storage::disk('public')->download($candidate->resume_path, $filename);
    }
}
