<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
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

	/**
	 * Score each job in $jobs against the candidate profile.
	 * Processes jobs in batches to avoid token limits.
	 * Returns the original jobs array with 'match_score' and 'match_reason' keys added.
	 */
	public function matchJobs(array $cvProfile, array $jobs): array
	{
		if (empty($jobs)) {
			return [];
		}

		$batchSize  = 8;
		$batches    = array_chunk($jobs, $batchSize, true);
		$allResults = [];

		// Build a concise CV summary for the prompt
		$skillsStr     = implode(', ', array_slice($cvProfile['skills'] ?? [], 0, 20));
		$experienceStr = implode('; ', array_slice($cvProfile['experience'] ?? [], 0, 5));
		$educationStr  = implode('; ', array_slice($cvProfile['education'] ?? [], 0, 3));
		$summary       = $cvProfile['summary'] ?? '';

		$cvSummary = "Candidate Summary: {$summary}\n"
			. "Skills: {$skillsStr}\n"
			. "Experience: {$experienceStr}\n"
			. "Education: {$educationStr}";

		foreach ($batches as $batch) {
			// Build the job list payload for this batch
			$jobListText = '';
			$batchKeys   = [];
			foreach ($batch as $key => $job) {
				$batchKeys[] = $key;
				$index       = count($batchKeys);
				$jobListText .= "Job #{$index} (id:{$job['id']})\n"
					. "Title: {$job['title']}\n"
					. "Description: " . substr($job['description'], 0, 400) . "\n\n";
			}

			try {
				$response = Prism::structured()
					->using(Provider::OpenRouter, 'gemini-2.5-flash')
					->withSystemPrompt(
						'You are an expert recruiter. Score how well a candidate matches each job description from 0 to 100. '
						. 'Be honest and objective. Return exactly one result per job in the same order provided.'
					)
					->withPrompt(
						"Candidate Profile:\n{$cvSummary}\n\nJobs to score:\n{$jobListText}"
					)
					->withClientOptions(['temperature' => 0])
					->withSchema(new ObjectSchema(
						name: 'job_matches',
						description: 'Match scores for each job',
						properties: [
							new ArraySchema(
								'matches',
								'List of job match results',
								new ObjectSchema(
									name: 'match',
									description: 'Match result for one job',
									properties: [
										new NumberSchema('job_id', 'The job id as provided'),
										new NumberSchema('match_score', 'Score from 0 to 100'),
										new StringSchema('match_reason', 'One sentence explaining the score'),
									],
									requiredFields: ['job_id', 'match_score', 'match_reason']
								)
							),
						],
						requiredFields: ['matches']
					))
					->asStructured();

				$structured = (array) ($response->structured ?? []);
				$matchMap   = [];

				foreach ($structured['matches'] ?? [] as $m) {
					$matchMap[(int) $m['job_id']] = $m;
				}

				foreach ($batch as $key => $job) {
					$m = $matchMap[$job['id']] ?? null;
					$allResults[] = array_merge($job, [
						'match_score'  => $m ? (int) $m['match_score'] : 0,
						'match_reason' => $m['match_reason'] ?? 'No match data available.',
					]);
				}
			} catch (\Throwable $e) {
				Log::error('CVAnalysisService::matchJobs batch failed', ['error' => $e->getMessage()]);
				// On failure, append jobs with score 0 so UI still works
				foreach ($batch as $job) {
					$allResults[] = array_merge($job, [
						'match_score'  => 0,
						'match_reason' => 'Matching unavailable for this job.',
					]);
				}
			}
		}

		// Sort by match_score descending
		usort($allResults, fn ($a, $b) => $b['match_score'] <=> $a['match_score']);

		return $allResults;
	}
}