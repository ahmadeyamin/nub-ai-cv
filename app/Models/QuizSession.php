<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuizSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'token',
        'status',
        'questions_count',
        'started_at',
        'completed_at',
        'expires_at',
        'score',
        'passed',
    ];

    protected $casts = [
        'started_at'   => 'datetime',
        'completed_at' => 'datetime',
        'expires_at'   => 'datetime',
        'passed'       => 'boolean',
    ];

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(QuizQuestion::class)->orderBy('question_number');
    }

    public function answers(): HasMany
    {
        return $this->hasMany(QuizAnswer::class);
    }

    /**
     * Whether the timer has expired and quiz should be force-submitted.
     */
    public function isExpired(): bool
    {
        if ($this->status === 'completed' || $this->status === 'expired') {
            return false;
        }

        return $this->expires_at && now()->greaterThan($this->expires_at);
    }

    /**
     * Get the time limit in minutes (same as question count).
     */
    public function getTimeLimitMinutes(): int
    {
        return $this->questions_count;
    }
}
