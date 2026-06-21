<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('quiz_token')->nullable()->unique()->after('ai_analysis');
            $table->string('quiz_status')->default('pending')->after('quiz_token');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn(['quiz_token', 'quiz_status']);
        });
    }
};
