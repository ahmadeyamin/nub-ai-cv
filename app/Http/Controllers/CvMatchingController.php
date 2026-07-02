<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Services\CVAnalysisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CvMatchingController extends Controller
{
    public function __construct(private CVAnalysisService $cvAnalyzer) {}

    /**
     * Show the CV matching page.
     * Passes any already-cached profile + pre-matched jobs from the session.
     */
    public function index(Request $request)
    {
        $profile = $request->session()->get('cv_matching_profile');
        $jobs    = $profile ? $this->getMatchedJobs($profile) : [];

        return Inertia::render('CvMatching/Index', [
            'cachedProfile' => $profile,
            'matchedJobs'   => $jobs,
        ]);
    }

    /**
     * Accept CV upload, parse it with AI, cache result in session.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:pdf|max:10240',
        ]);

        $path    = $request->file('resume')->store('cv-matching', 'public');
        $profile = $this->cvAnalyzer->parseGeneral($path);

        // Attach the stored file path so apply flow can use it
        $profile['resume_path'] = $path;

        $request->session()->put('cv_matching_profile', $profile);

        return response()->json([
            'profile'     => $profile,
            'matchedJobs' => $this->getMatchedJobs($profile),
        ]);
    }

    /**
     * Re-run matching against current session CV.
     * Useful for a manual refresh without re-uploading.
     */
    public function match(Request $request)
    {
        $profile = $request->session()->get('cv_matching_profile');

        if (! $profile) {
            return response()->json(['error' => 'No CV cached. Please upload your CV first.'], 422);
        }

        return response()->json([
            'profile'     => $profile,
            'matchedJobs' => $this->getMatchedJobs($profile),
        ]);
    }

    /**
     * Clear the cached CV from the session.
     */
    public function clear(Request $request)
    {
        $request->session()->forget('cv_matching_profile');
        return response()->json(['success' => true]);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // Helpers
    // ──────────────────────────────────────────────────────────────────────────

    /**
     * Load jobs posted within the last 15 days and score them against the profile.
     */
    private function getMatchedJobs(array $profile): array
    {
        $jobs = Job::with('user')
            ->where('created_at', '>=', now()->subDays(15))
            ->latest()
            ->get()
            ->toArray();

        if (empty($jobs)) {
            return [];
        }

        return $this->cvAnalyzer->matchJobs($profile, $jobs);
    }
}
