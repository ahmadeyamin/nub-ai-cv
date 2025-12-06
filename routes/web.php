<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [JobController::class, 'index'])->name('home');

Route::get('jobs/{job}', [JobController::class, 'show'])->name('jobs.show');
Route::post('jobs/{job}/applications', [ApplicationController::class, 'store'])->name('applications.store');

Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'dashboard'], function () {
    Route::resource('jobs', JobController::class)->only(['create', 'store', 'update', 'destroy']);
    Route::get('/', [HomeController::class, 'index'])->name('dashboard');

});

require __DIR__ . '/settings.php';
