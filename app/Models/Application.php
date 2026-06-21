<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_post_id',
        'user_id',
        'name',
        'email',
        'resume_path',
        'cover_note',
        'ai_score',
        'ai_analysis',
        'quiz_token',
        'quiz_status',
    ];

    protected $casts = [
        'ai_analysis' => 'array',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_post_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quizSession(): HasOne
    {
        return $this->hasOne(QuizSession::class);
    }
}
