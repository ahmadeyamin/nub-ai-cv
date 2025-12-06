<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::with('user')->latest()->get();
        return Inertia::render('Home', [
            'jobs' => $jobs
        ]);
    }

    public function show(Job $job)
    {
        $job->load('user');
        return Inertia::render('Job/Show', [
            'job' => $job
        ]);
    }

    public function create()
    {
        return Inertia::render('Job/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'type' => 'required|string|in:Full-time,Part-time,Contract,Freelance,Internship',
        ]);

        $request->user()->jobs()->create($validated);

        return redirect()->route('dashboard');
    }
}
