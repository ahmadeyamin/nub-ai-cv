<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [JobController::class, 'index'])->name('home');

Route::get('jobs/{job}', [JobController::class, 'show'])->name('jobs.show');
Route::post('jobs/{job}/applications', [ApplicationController::class, 'store'])->name('applications.store');

// ── Quiz routes (public — token-based, no auth required) ──────────────────────
Route::prefix('quiz/{token}')->name('quiz.')->group(function () {
    Route::get('/',            [QuizController::class, 'show'])->name('show');
    Route::get('/status',      [QuizController::class, 'status'])->name('status');
    Route::post('/start',      [QuizController::class, 'start'])->name('start');
    Route::get('/question/{n}',[QuizController::class, 'question'])->name('question');
    Route::post('/answer',     [QuizController::class, 'answer'])->name('answer');
    Route::get('/result',      [QuizController::class, 'result'])->name('result');
});

// ── Admin dashboard (auth required) ──────────────────────────────────────────
Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'dashboard'], function () {
    Route::resource('jobs', JobController::class)->only(['create', 'store', 'update', 'destroy']);
    Route::get('/', [HomeController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
