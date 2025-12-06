<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Schema\ArraySchema;
use Prism\Prism\Schema\NumberSchema;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;
use Prism\Prism\ValueObjects\Media\Document;

class CVAnalysisService
{
	public function analyze(string $resumePath, string $jobDescription)
	{
		// Resolve the full path from storage
		$fullPath = Storage::disk('public')->path($resumePath);

		$response = Prism::structured()
			// Use the experimental Gemini 2.0 Pro model
			->using(Provider::Gemini, 'gemini-2.5-flash')
			->withSystemPrompt('You are an expert HR recruiter. Analyze the candidate resume against the job description.')
			->withPrompt(
				"Job Description:\n$jobDescription\n\nPlease analyze the attached resume.",
				[
					// Pass the file directly to Gemini
					Document::fromPath($fullPath)
				]
			)
			->withClientOptions(['temperature' => 0])
			->withSchema(new ObjectSchema(
				name: 'analysis',
				description: 'The analysis of the candidate resume',
				properties: [
					new StringSchema('name', 'The candidate\'s full name.'),
					new StringSchema('email', 'The candidate\'s email address.'),
					new NumberSchema('score', 'A score from 0 to 100 indicating how well the candidate matches the job.'),
					new ArraySchema('strengths', 'A strength of the candidate.', new StringSchema('strength', 'A strength of the candidate.')),
					new ArraySchema('weaknesses', 'A weakness of the candidate.', new StringSchema('weakness', 'A weakness of the candidate.')),
					new StringSchema('summary', 'A brief summary of the candidate\'s suitability.'),
				],
				requiredFields: ['name', 'email', 'score', 'strengths', 'weaknesses', 'summary']
			))
			->asStructured();

		return (array) ($response->structured ?? []);
	}
}