<?php
 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'resume_path',
        'skills',
        'experience',
        'education',
        'summary',
        'raw_analysis',
    ];

    protected $casts = [
        'skills' => 'array',
        'experience' => 'array',
        'education' => 'array',
        'raw_analysis' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function getMaskedNameAttribute()
    {
        return substr($this->name, 0, 3) . '***';
    }

    public function getMaskedEmailAttribute()
    {
        $email = $this->email;
        $parts = explode('@', $email);
        $name = $parts[0];
        $domain = $parts[1];
        return substr($name, 0, 3) . '***@' . $domain;
    }

    public function getMaskedPhoneAttribute()
    {
        $phone = $this->phone;
        return Str::mask($phone, '*', 9);
    }
}
