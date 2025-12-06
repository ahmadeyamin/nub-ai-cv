<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [\App\Http\Controllers\JobController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $jobs = \App\Models\Job::where('user_id', auth()->id())
            ->with(['applications.user'])
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'jobs' => $jobs
        ]);
    })->name('dashboard');

    Route::resource('jobs', \App\Http\Controllers\JobController::class)->only(['create', 'store', 'show']);
    Route::post('jobs/{job}/applications', [\App\Http\Controllers\ApplicationController::class, 'store'])->name('applications.store');
});

require __DIR__ . '/settings.php';
