<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

    protected $casts = [
        'ai_analysis' => 'array',
    ];

    public function job()
    {
        return $this->belongsTo(Job::class, 'job_post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
