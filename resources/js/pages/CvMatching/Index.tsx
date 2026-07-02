import { useState, useRef, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import {
    Brain, Upload, FileText, CheckCircle, AlertCircle, Sparkles,
    MapPin, DollarSign, Briefcase, ArrowRight, RefreshCw, X,
    TrendingUp, Star, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GuestLayout from '@/layouts/guest-layout';
import { useCvCache, type CvProfile } from '@/hooks/use-cv-cache';

// ── Types ─────────────────────────────────────────────────────────────────────

interface MatchedJob {
    id: number;
    title: string;
    description: string;
    location: string;
    salary_range: string | null;
    type: string;
    created_at: string;
    user: { name: string };
    match_score: number;
    match_reason: string;
}

interface Props {
    cachedProfile: CvProfile | null;
    matchedJobs: MatchedJob[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreLabel(score: number): { label: string; color: string; bg: string; ring: string } {
    if (score >= 80) return { label: 'Excellent Match', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/40', ring: 'ring-emerald-300 dark:ring-emerald-700' };
    if (score >= 60) return { label: 'Good Match',      color: 'text-amber-700  dark:text-amber-300',   bg: 'bg-amber-100  dark:bg-amber-900/40',   ring: 'ring-amber-300  dark:ring-amber-700'  };
    return              { label: 'Partial Match',       color: 'text-rose-700   dark:text-rose-300',    bg: 'bg-rose-100   dark:bg-rose-900/40',    ring: 'ring-rose-300   dark:ring-rose-700'   };
}

function ScoreBadge({ score }: { score: number }) {
    const { label, color, bg, ring } = scoreLabel(score);
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 ${bg} ${ring}`}>
            <span className={`text-lg font-bold tabular-nums ${color}`}>{score}%</span>
            <span className={`text-xs font-semibold ${color}`}>{label}</span>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function CvMatchingIndex({ cachedProfile, matchedJobs }: Props) {
    const { profile: localProfile, hasCache, setCache, clearCache } = useCvCache();

    // Prefer server-passed profile (from session) but fall back to localStorage
    const activeProfile = cachedProfile ?? localProfile;
    const showResults   = !!activeProfile;

    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [jobs, setJobs] = useState<MatchedJob[]>(matchedJobs);
    const [currentProfile, setCurrentProfile] = useState<CvProfile | null>(activeProfile);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // ── File selection ──────────────────────────────────────────────────────

    const handleFile = (file: File) => {
        if (file.type !== 'application/pdf') {
            setUploadError('Only PDF files are accepted.');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('File is too large (max 10 MB).');
            return;
        }
        setUploadError(null);
        setSelectedFile(file);
    };

    const handleDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop      = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    };

    // ── Upload & match ──────────────────────────────────────────────────────

    const handleUpload = useCallback(async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            const res = await axios.post('/cv-matching/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const data = res.data;
            setCurrentProfile(data.profile as CvProfile);
            setJobs(data.matchedJobs ?? []);
            setCache(data.profile as CvProfile);
        } catch (err: any) {
            const msg = err?.response?.data?.message ?? err?.message ?? 'Something went wrong.';
            setUploadError(msg);
        } finally {
            setIsUploading(false);
        }
    }, [selectedFile, setCache]);

    // ── Clear / reset ───────────────────────────────────────────────────────

    const handleClear = useCallback(async () => {
        clearCache();
        setCurrentProfile(null);
        setJobs([]);
        setSelectedFile(null);
        // Also clear server-side session
        await axios.delete('/cv-matching/clear').catch(() => {/* best effort */});
    }, [clearCache]);

    // ── Refresh matching ────────────────────────────────────────────────────

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const res = await axios.get('/cv-matching/match');
            setJobs(res.data.matchedJobs ?? []);
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    // ── Render: Upload State ────────────────────────────────────────────────

    const renderUploadState = () => (
        <div className="max-w-2xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/25 mb-6">
                    <Brain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    Find Your Perfect Job Match
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                    Upload your CV once. Our AI will instantly score every job posting against your skills and experience.
                </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                    { icon: <Zap className="w-4 h-4" />, text: 'Instant AI Scoring' },
                    { icon: <Star className="w-4 h-4" />, text: 'Ranked by Match %' },
                    { icon: <CheckCircle className="w-4 h-4" />, text: 'One-click Apply' },
                ].map(({ icon, text }) => (
                    <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-700">
                        <span className="text-emerald-500">{icon}</span>
                        {text}
                    </span>
                ))}
            </div>

            {/* Upload card */}
            <Card className="border-0 shadow-xl">
                <CardContent className="pt-8 pb-8 px-8">
                    {/* Drop zone */}
                    <div
                        id="cv-dropzone"
                        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${
                            isDragging
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-[1.01]'
                                : 'border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                        />

                        {selectedFile ? (
                            <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white text-base">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-400 mt-0.5">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to replace</p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 hover:bg-emerald-100">
                                    PDF Ready
                                </Badge>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <Upload className="w-7 h-7 text-slate-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-white">
                                        <span className="text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag & drop
                                    </p>
                                    <p className="text-sm text-gray-400 mt-0.5">PDF only · Max 10 MB</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {uploadError && (
                        <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {uploadError}
                        </div>
                    )}

                    <Button
                        id="cv-find-jobs-btn"
                        className="w-full mt-6 py-6 text-base bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 rounded-xl"
                        disabled={!selectedFile || isUploading}
                        onClick={handleUpload}
                    >
                        {isUploading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                                Analyzing CV & Finding Matches…
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Find My Matching Jobs
                            </span>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    // ── Render: Results State ───────────────────────────────────────────────

    const renderResultsState = () => (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile banner */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white overflow-hidden">
                <CardContent className="py-6 px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">
                                    {currentProfile?.name ?? 'Your CV is ready!'}
                                </h2>
                                <p className="text-emerald-100 text-sm">
                                    {jobs.length} matching job{jobs.length !== 1 ? 's' : ''} found in the last 15 days
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                id="cv-refresh-btn"
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 text-white hover:bg-white/30 border-0"
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                            >
                                <RefreshCw className={`w-4 h-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            <Button
                                id="cv-clear-btn"
                                size="sm"
                                variant="secondary"
                                className="bg-white/20 text-white hover:bg-white/30 border-0"
                                onClick={handleClear}
                            >
                                <X className="w-4 h-4 mr-1.5" />
                                Upload New CV
                            </Button>
                        </div>
                    </div>

                    {/* Skill pills */}
                    {(currentProfile?.skills ?? []).length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {(currentProfile!.skills).slice(0, 10).map(skill => (
                                <span key={skill} className="px-2 py-0.5 text-xs font-medium bg-white/20 rounded-full">
                                    {skill}
                                </span>
                            ))}
                            {(currentProfile!.skills).length > 10 && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-white/20 rounded-full">
                                    +{(currentProfile!.skills).length - 10} more
                                </span>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Job list */}
            {jobs.length === 0 ? (
                <Card className="border-0 shadow-md">
                    <CardContent className="py-16 text-center">
                        <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            No jobs posted in the last 15 days
                        </h3>
                        <p className="text-gray-400 text-sm">Check back soon — new opportunities are posted regularly.</p>
                        <Link href="/">
                            <Button variant="outline" className="mt-6">Browse All Jobs</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job, idx) => {
                        const { color, bg, ring } = scoreLabel(job.match_score);
                        return (
                            <Card
                                key={job.id}
                                className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                        {/* Rank badge */}
                                        <div className="flex-shrink-0 hidden sm:flex w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400">
                                            #{idx + 1}
                                        </div>

                                        {/* Job info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.user.name}</p>
                                                </div>
                                                <ScoreBadge score={job.match_score} />
                                            </div>

                                            <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3 leading-relaxed">
                                                "{job.match_reason}"
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                                                </span>
                                                {job.salary_range && (
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign className="w-3.5 h-3.5" /> {job.salary_range}
                                                    </span>
                                                )}
                                                <Badge variant="outline" className="text-xs">
                                                    {job.type}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Apply CTA */}
                                        <div className="flex-shrink-0">
                                            <Link href={`/jobs/${job.id}`}>
                                                <Button
                                                    id={`apply-job-${job.id}`}
                                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
                                                >
                                                    Apply Now
                                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );

    // ── Main render ─────────────────────────────────────────────────────────

    return (
        <GuestLayout>
            <Head title="Find Matching Jobs — Career Hub" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
                {currentProfile ? renderResultsState() : renderUploadState()}
            </div>
        </GuestLayout>
    );
}
