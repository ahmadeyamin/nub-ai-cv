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
import { FileText, Star } from 'lucide-react';
import { dashboard } from '@/routes';
import { create, show } from '@/routes/jobs';

interface Application {
    id: number;
    name: string;
    email: string;
    resume_path: string;
    ai_score: number;
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
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard() }]}>
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
                                                            <TableHead>Candidate</TableHead>
                                                            <TableHead>Applied Date</TableHead>
                                                            <TableHead>AI Score</TableHead>
                                                            <TableHead className="text-right">Actions</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {job.applications
                                                            .sort((a, b) => (b.ai_score || 0) - (a.ai_score || 0))
                                                            .map((app) => (
                                                                <TableRow key={app.id}>
                                                                    <TableCell>
                                                                        <div>
                                                                            <div className="font-medium">{app.name}</div>
                                                                            <div className="text-sm text-gray-500">{app.email}</div>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {new Date(app.created_at).toLocaleDateString()}
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
