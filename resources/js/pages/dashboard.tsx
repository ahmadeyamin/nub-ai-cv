import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { FileText, Star, Eye } from 'lucide-react'; // Added Eye icon
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
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard().url }]}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">My Job Postings</h2>
                                <Link href={create()}>
                                    <Button>Post New Job</Button>
                                </Link>
                            </div>

                            <div className="space-y-8">
                                {jobs.map((job) => (
                                    <Card key={job.id}>
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <Link href={show(job.id)} className="hover:underline">
                                                    {job.title}
                                                </Link>
                                                <Badge variant="outline">
                                                    {job.applications.length} Applications
                                                </Badge>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {job.applications.length > 0 ? (
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>ID</TableHead>
                                                            <TableHead>Candidate</TableHead>
                                                            <TableHead>Applied Date</TableHead>
                                                            <TableHead>AI Score</TableHead>
                                                            <TableHead className="text-right">Actions</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {job.applications
                                                            .map((app) => (
                                                                <TableRow key={app.id}>
                                                                    <TableCell>{app.id}</TableCell>
                                                                    <TableCell>
                                                                        <div>
                                                                            <div className="font-medium">{app.name}</div>
                                                                            <div className="text-sm text-gray-500">{app.email}</div>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {new Date(app.created_at).toLocaleString()}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {app.ai_score !== null ? (
                                                                            <div className="flex items-center">
                                                                                <span className={`font-bold ${app.ai_score >= 80 ? 'text-green-600' :
                                                                                    app.ai_score >= 50 ? 'text-yellow-600' :
                                                                                        'text-red-600'
                                                                                    }`}>
                                                                                    {app.ai_score}/100
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-gray-400">Pending</span>
                                                                        )}
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        <div className="flex justify-end gap-2">
                                                                            {app.ai_analysis && (
                                                                                <Dialog>
                                                                                    <DialogTrigger asChild>
                                                                                        <Button variant="outline" size="sm">
                                                                                            <Eye className="h-4 w-4 mr-2" />
                                                                                            Analysis
                                                                                        </Button>
                                                                                    </DialogTrigger>
                                                                                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                                                                        <DialogHeader>
                                                                                            <DialogTitle>AI Analysis for {app.name}</DialogTitle>
                                                                                            <DialogDescription>
                                                                                                Candidate Score: {app.ai_score}/100
                                                                                            </DialogDescription>
                                                                                        </DialogHeader>
                                                                                        <div className="space-y-4">
                                                                                            <div>
                                                                                                <h4 className="font-semibold mb-2">Summary</h4>
                                                                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                                                    {app.ai_analysis.summary}
                                                                                                </p>
                                                                                            </div>
                                                                                            <div>
                                                                                                <h4 className="font-semibold mb-2 text-green-600">Strengths</h4>
                                                                                                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                                                                                                    {app.ai_analysis.strengths.map((strength, index) => (
                                                                                                        <li key={index}>{strength}</li>
                                                                                                    ))}
                                                                                                </ul>
                                                                                            </div>
                                                                                            <div>
                                                                                                <h4 className="font-semibold mb-2 text-red-600">Weaknesses</h4>
                                                                                                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                                                                                                    {app.ai_analysis.weaknesses.map((weakness, index) => (
                                                                                                        <li key={index}>{weakness}</li>
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
                                                                                <Button variant="ghost" size="sm">
                                                                                    <FileText className="h-4 w-4 mr-2" />
                                                                                    Resume
                                                                                </Button>
                                                                            </a>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </TableBody>
                                                </Table>
                                            ) : (
                                                <div className="text-center py-4 text-gray-500">
                                                    No applications yet.
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                                {jobs.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        You haven't posted any jobs yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
