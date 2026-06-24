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
			// Use the experimental Gemini 2.5 Flash model
			->using(Provider::OpenRouter, 'gemini-2.5-flash')
			->withSystemPrompt('You are an expert HR recruiter. Analyze the candidate resume against the job description.')
			->withPrompt(
				"Job Description:\n$jobDescription\n\nPlease analyze the attached resume.",
				[
					// Pass the file directly to Gemini
					Document::fromLocalPath($fullPath)
				]
			)
			->withClientOptions(['temperature' => 0])
			->withSchema(new ObjectSchema(
				name: 'analysis',
				description: 'The analysis of the candidate resume',
				properties: [
					new StringSchema('name', 'The candidate\'s full name.'),
					new StringSchema('email', 'The candidate\'s email address.'),
					new StringSchema('phone', 'The candidate\'s phone number or contact number. If not found, write N/A.'),
					new ArraySchema('skills', 'A list of key skills, technologies, and programming languages.', new StringSchema('skill', 'A skill name.')),
					new ArraySchema('experience', 'A list of past jobs and professional experiences.', new StringSchema('exp', 'Past job title, company, duration, and key duties.')),
					new ArraySchema('education', 'A list of academic degrees and certifications.', new StringSchema('edu', 'Degree name, institution, and graduation year.')),
					new NumberSchema('score', 'A score from 0 to 100 indicating how well the candidate matches the job.'),
					new ArraySchema('strengths', 'A strength of the candidate.', new StringSchema('strength', 'A strength of the candidate.')),
					new ArraySchema('weaknesses', 'A weakness of the candidate.', new StringSchema('weakness', 'A weakness of the candidate.')),
					new StringSchema('summary', 'A brief summary of the candidate\'s suitability and background.'),
				],
				requiredFields: ['name', 'email', 'phone', 'skills', 'experience', 'education', 'score', 'strengths', 'weaknesses', 'summary']
			))
			->asStructured();

		return (array) ($response->structured ?? []);
	}

	public function parseGeneral(string $resumePath)
	{
		// Resolve the full path from storage
		$fullPath = Storage::disk('public')->path($resumePath);

		$response = Prism::structured()
			->using(Provider::OpenRouter, 'gemini-2.5-flash')
			->withSystemPrompt('You are an expert HR recruiter. Parse and extract all relevant candidate profile details from the attached resume.')
			->withPrompt(
				"Please analyze and extract all details from the attached resume.",
				[
					Document::fromLocalPath($fullPath)
				]
			)
			->withClientOptions(['temperature' => 0])
			->withSchema(new ObjectSchema(
				name: 'candidate_profile',
				description: 'The parsed profile of the candidate',
				properties: [
					new StringSchema('name', 'The candidate\'s full name.'),
					new StringSchema('email', 'The candidate\'s email address.'),
					new StringSchema('phone', 'The candidate\'s phone number or contact number. If not found, write N/A.'),
					new ArraySchema('skills', 'A list of key skills, technologies, and programming languages.', new StringSchema('skill', 'A skill name.')),
					new ArraySchema('experience', 'A list of past jobs and professional experiences.', new StringSchema('exp', 'Past job title, company, duration, and key duties.')),
					new ArraySchema('education', 'A list of academic degrees and certifications.', new StringSchema('edu', 'Degree name, institution, and graduation year.')),
					new StringSchema('summary', 'A brief professional summary of the candidate\'s background.'),
				],
				requiredFields: ['name', 'email', 'phone', 'skills', 'experience', 'education', 'summary']
			))
			->asStructured();

		return (array) ($response->structured ?? []);
	}
}