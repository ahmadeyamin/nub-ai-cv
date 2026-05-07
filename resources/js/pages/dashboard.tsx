import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
    FileText, 
    Star, 
    Eye, 
    Brain, 
    TrendingUp, 
    Users, 
    Briefcase, 
    CheckCircle, 
    AlertCircle, 
    Download,
    Calendar,
    Target,
    BarChart3,
    Plus
} from 'lucide-react';
import { dashboard } from '@/routes';
import { create, show } from '@/routes/jobs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Application {
    id: number;
    name: string;
    email: string;
    resume_path: string;
    ai_score: number;
    ai_analysis: {
        summary: string;
        strengths: string[];
        weaknesses: string[];
    };
    created_at: string;
}

interface Job {
    id: number;
    title: string;
    applications: Application[];
}

interface DashboardProps {
    jobs: Job[];
}

export default function Dashboard({ jobs }: DashboardProps) {
    // Calculate overall statistics
    const totalApplications = jobs.reduce((sum, job) => sum + job.applications.length, 0);
    const averageScore = jobs.reduce((sum, job) => {
        const jobScores = job.applications.filter(app => app.ai_score !== null).map(app => app.ai_score);
        return sum + (jobScores.length > 0 ? jobScores.reduce((a, b) => a + b, 0) / jobScores.length : 0);
    }, 0) / (jobs.length || 1);
    
    const topCandidates = jobs.flatMap(job => 
        job.applications.filter(app => app.ai_score >= 80)
    ).length;

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard().url }]}>
            <Head title="Employer Dashboard - AI Career Hub" />

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Employer Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Manage your job postings and review AI-powered candidate analysis
                            </p>
                        </div>
                        <Link href={create()}>
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Post New Job
                            </Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Jobs</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{jobs.length}</p>
                                    </div>
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                        <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Applications</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalApplications}</p>
                                    </div>
                                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                        <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Match Score</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(averageScore)}%</p>
                                    </div>
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                        <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Top Candidates</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{topCandidates}</p>
                                    </div>
                                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                        <Star className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* AI Insights Banner */}
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        AI-Powered Hiring Insights
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Our AI analyzes each resume against your job requirements, providing match scores and detailed insights to help you make better hiring decisions.
                                    </p>
                                </div>
                                <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Job Postings */}
                    <div className="space-y-6">
                        {jobs.map((job) => {
                            const jobAvgScore = job.applications.filter(app => app.ai_score !== null).length > 0
                                ? job.applications.filter(app => app.ai_score !== null).reduce((sum, app) => sum + app.ai_score, 0) / job.applications.filter(app => app.ai_score !== null).length
                                : 0;

                            return (
                                <Card key={job.id} className="border-0 shadow-lg">
                                    <CardHeader className="pb-4">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Link href={show(job.id)} className="hover:underline">
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {job.title}
                                                        </h3>
                                                    </Link>
                                                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                                        {job.applications.length} Applications
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Active</span>
                                                    </div>
                                                    {job.applications.length > 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <TrendingUp className="w-4 h-4" />
                                                            <span>Avg Score: {Math.round(jobAvgScore)}%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <Link href={show(job.id)}>
                                                <Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Job
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        {job.applications.length > 0 ? (
                                            <div className="space-y-4">
                                                {/* Score Distribution */}
                                                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                            {job.applications.filter(app => app.ai_score >= 80).length}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-300">Excellent (80-100)</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                                            {job.applications.filter(app => app.ai_score >= 50 && app.ai_score < 80).length}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-300">Good (50-79)</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                            {job.applications.filter(app => app.ai_score < 50).length}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-300">Needs Review (0-49)</div>
                                                    </div>
                                                </div>

                                                {/* Applications Table */}
                                                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                    <Table>
                                                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                                            <TableRow>
                                                                <TableHead>Candidate</TableHead>
                                                                <TableHead>AI Score</TableHead>
                                                                <TableHead>Match Level</TableHead>
                                                                <TableHead>Applied</TableHead>
                                                                <TableHead className="text-right">Actions</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {job.applications
                                                                .sort((a, b) => (b.ai_score || 0) - (a.ai_score || 0))
                                                                .map((app) => (
                                                                    <TableRow key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                                        <TableCell>
                                                                            <div>
                                                                                <div className="font-medium text-gray-900 dark:text-white">{app.name}</div>
                                                                                <div className="text-sm text-gray-500 dark:text-gray-400">{app.email}</div>
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {app.ai_score !== null ? (
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="flex items-center">
                                                                                        <div className={`w-2 h-2 rounded-full mr-2 ${
                                                                                            app.ai_score >= 80 ? 'bg-green-500' :
                                                                                            app.ai_score >= 50 ? 'bg-yellow-500' :
                                                                                            'bg-red-500'
                                                                                        }`} />
                                                                                        <span className={`font-bold ${
                                                                                            app.ai_score >= 80 ? 'text-green-600' :
                                                                                            app.ai_score >= 50 ? 'text-yellow-600' :
                                                                                            'text-red-600'
                                                                                        }`}>
                                                                                            {app.ai_score}/100
                                                                                        </span>
                                                                                    </div>
                                                                                    <Progress value={app.ai_score} className="w-16" />
                                                                                </div>
                                                                            ) : (
                                                                                <span className="text-gray-400">Processing...</span>
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {app.ai_score !== null && (
                                                                                <Badge className={
                                                                                    app.ai_score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                                                                    app.ai_score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                                                }>
                                                                                    {app.ai_score >= 80 ? 'Excellent Match' :
                                                                                     app.ai_score >= 50 ? 'Good Match' :
                                                                                     'Needs Review'}
                                                                                </Badge>
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                                                                            {new Date(app.created_at).toLocaleDateString()}
                                                                        </TableCell>
                                                                        <TableCell className="text-right">
                                                                            <div className="flex justify-end gap-2">
                                                                                {app.ai_analysis && (
                                                                                    <Dialog>
                                                                                        <DialogTrigger asChild>
                                                                                            <Button variant="outline" size="sm" className="border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700">
                                                                                                <Brain className="h-4 w-4 mr-2" />
                                                                                                AI Analysis
                                                                                            </Button>
                                                                                        </DialogTrigger>
                                                                                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                                                                            <DialogHeader>
                                                                                                <DialogTitle className="flex items-center gap-2">
                                                                                                    <Brain className="w-5 h-5 text-purple-600" />
                                                                                                    AI Analysis for {app.name}
                                                                                                </DialogTitle>
                                                                                                <DialogDescription>
                                                                                                    Comprehensive analysis powered by AI with a match score of {app.ai_score}/100
                                                                                                </DialogDescription>
                                                                                            </DialogHeader>
                                                                                            <div className="space-y-6">
                                                                                                {/* Score Overview */}
                                                                                                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                                                                                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                                                                                                        {app.ai_score}/100
                                                                                                    </div>
                                                                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                                                                        Overall Match Score
                                                                                                    </div>
                                                                                                </div>

                                                                                                {/* Summary */}
                                                                                                <div>
                                                                                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                                                                        <FileText className="w-4 h-4" />
                                                                                                        Summary
                                                                                                    </h4>
                                                                                                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                                                                                        {app.ai_analysis.summary}
                                                                                                    </p>
                                                                                                </div>

                                                                                                {/* Strengths */}
                                                                                                <div>
                                                                                                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                                                                                                        <CheckCircle className="w-4 h-4" />
                                                                                                        Strengths
                                                                                                    </h4>
                                                                                                    <ul className="space-y-2">
                                                                                                        {app.ai_analysis.strengths.map((strength, index) => (
                                                                                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                                                                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                                                                <span>{strength}</span>
                                                                                                            </li>
                                                                                                        ))}
                                                                                                    </ul>
                                                                                                </div>

                                                                                                {/* Weaknesses */}
                                                                                                <div>
                                                                                                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                                                                                                        <AlertCircle className="w-4 h-4" />
                                                                                                        Areas for Improvement
                                                                                                    </h4>
                                                                                                    <ul className="space-y-2">
                                                                                                        {app.ai_analysis.weaknesses.map((weakness, index) => (
                                                                                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                                                                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                                                                                <span>{weakness}</span>
                                                                                                            </li>
                                                                                                        ))}
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </div>
                                                                                        </DialogContent>
                                                                                    </Dialog>
                                                                                )}
                                                                                <a
                                                                                    href={`/storage/${app.resume_path}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    <Button variant="outline" size="sm">
                                                                                        <Download className="h-4 w-4 mr-2" />
                                                                                        Resume
                                                                                    </Button>
                                                                                </a>
                                                                            </div>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Users className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    No Applications Yet
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                    Start receiving applications and AI-powered analysis
                                                </p>
                                                <Link href={show(job.id)}>
                                                    <Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
                                                        Share Job Posting
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {jobs.length === 0 && (
                            <Card className="border-0 shadow-lg">
                                <CardContent className="py-16 text-center">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Briefcase className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        No Job Postings Yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                                        Start by posting your first job opening to begin receiving AI-powered candidate analysis and make better hiring decisions.
                                    </p>
                                    <Link href={create()}>
                                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                                            <Plus className="w-5 h-5 mr-2" />
                                            Post Your First Job
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
