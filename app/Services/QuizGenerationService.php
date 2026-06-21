<?php

namespace App\Services;

use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Schema\ArraySchema;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class QuizGenerationService
{
    /**
     * Generate N multiple-choice questions tailored to the job and CV analysis.
     *
     * @param  string  $jobTitle
     * @param  string  $jobDescription
     * @param  array   $cvAnalysis  Keys: name, email, score, strengths, weaknesses, summary
     * @param  int     $count       Number of questions to generate
     * @return array   Array of question arrays
     */
    public function generate(
        string $jobTitle,
        string $jobDescription,
        array $cvAnalysis,
        int $count = 10
    ): array {
        $candidateName    = $cvAnalysis['name']    ?? 'the candidate';
        $strengths        = implode(', ', $cvAnalysis['strengths'] ?? []);
        $weaknesses       = implode(', ', $cvAnalysis['weaknesses'] ?? []);
        $summary          = $cvAnalysis['summary'] ?? '';

        $prompt = <<<PROMPT
You are an expert technical interviewer. Generate exactly {$count} multiple-choice quiz questions for a job candidate.

Job Title: {$jobTitle}
Job Description:
{$jobDescription}

Candidate Summary:
- Name: {$candidateName}
- Strengths: {$strengths}
- Areas to Improve: {$weaknesses}
- Overall Summary: {$summary}

Rules:
1. Each question must have exactly 4 options (a, b, c, d).
2. Only one option is correct.
3. Questions should be a MIX of:
   - Technical questions directly related to the job role and requirements (~60%)
   - Situational / behavioral questions relevant to the candidate's profile (~40%)
4. Questions should be challenging but fair.
5. Distractors (wrong options) should be plausible, not obviously wrong.
6. Return exactly {$count} questions. No more, no less.
PROMPT;

        $response = Prism::structured()
            ->using(Provider::OpenRouter, 'gemini-2.5-flash')
            ->withSystemPrompt('You are an expert technical recruiter generating interview quiz questions.')
            ->withPrompt($prompt)
            ->withClientOptions(['temperature' => 0.7])
            ->withSchema(new ObjectSchema(
                name: 'quiz',
                description: 'A set of multiple-choice quiz questions',
                properties: [
                    new ArraySchema(
                        name: 'questions',
                        description: "Exactly {$count} multiple-choice questions",
                        items: new ObjectSchema(
                            name: 'question',
                            description: 'A single multiple-choice question',
                            properties: [
                                new StringSchema('question_text', 'The question text'),
                                new StringSchema('option_a', 'Option A text'),
                                new StringSchema('option_b', 'Option B text'),
                                new StringSchema('option_c', 'Option C text'),
                                new StringSchema('option_d', 'Option D text'),
                                new StringSchema('correct_option', 'The correct option letter: a, b, c, or d'),
                            ],
                            requiredFields: ['question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option']
                        )
                    ),
                ],
                requiredFields: ['questions']
            ))
            ->asStructured();

        $data = (array) ($response->structured ?? []);

        return $data['questions'] ?? [];
    }
}
