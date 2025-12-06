<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $jobs = Job::where('user_id', auth()->id())
            ->with(['applications.user'])
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'jobs' => $jobs
        ]);
    }
}
