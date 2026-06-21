<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $jobs = Job::where('user_id', Auth::id())
            ->with([
                'applications' => function ($query) {
                    $query->latest()->with([
                        'quizSession' => function ($q) {
                            $q->with([
                                'questions.answer',
                            ]);
                        },
                    ]);
                },
            ])
            ->latest()
            ->get();

        return Inertia::render('dashboard', [
            'jobs' => $jobs,
        ]);
    }
}
