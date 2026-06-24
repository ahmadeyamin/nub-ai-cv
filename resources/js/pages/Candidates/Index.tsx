import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
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
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import {
    Search,
    Upload,
    Mail,
    Phone,
    Download,
    Eye,
    Briefcase,
    GraduationCap,
    Clock,
    X,
    FileText,
    Brain,
    User,
    CheckCircle2,
    Building2,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { index as candidatesIndex , download as candidatesDownload } from '@/routes/candidates';

interface JobPost {
    id: number;
    title: string;
}

interface QuizSession {
    id: number;
    score: number | null;
    passed: boolean | null;
}

interface Application {
    id: number;
    job_post_id: number;
    job: JobPost;
    ai_score: number | null;
    quiz_status: string;
    quiz_session: QuizSession | null;
    created_at: string;
}

interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    resume_path: string | null;
    skills: string[] | null;
    experience: string[] | null;
    education: string[] | null;
    summary: string | null;
    created_at: string;
    applications: Application[];
}


export default function CandidatesIndex() {
    const { props } = usePage<{
        candidates: Candidate[];
        filters: {
            search?: string;
        };
        errors: Record<string, string>;
    }>();
    const { candidates, filters } = props;

    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Trigger server-side search
        router.get(candidatesIndex().url, { search: searchQuery }, { preserveState: true });
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        router.get(candidatesIndex().url, {}, { preserveState: true });
    };

    const openCandidateDetails = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setIsDetailOpen(true);
    };

    return (
        <GuestLayout>
            <Head title="Candidates Directory - Career Hub" />

            <div className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Candidates Directory
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Browse, search, and view all parsed candidates and their qualifications.
                            </p>
                        </div>
                    </div>

                    {/* Search Panel */}
                    <Card className="border-0 shadow-lg mb-8">
                        <CardContent className="p-4 sm:p-6">
                            <form onSubmit={handleSearchSubmit} className="flex gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by name, email, phone, or specific skills (e.g. React, PHP)..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 h-11 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={handleClearSearch}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                                <Button type="submit" size="lg" className="bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 h-11">
                                    Search
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Candidates Table */}
                    <Card className="border-0 shadow-lg overflow-hidden">
                        {candidates.length === 0 ? (
                            <div className="p-16 text-center">
                                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No Candidates Found</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                    {searchQuery
                                        ? `No candidate matches your search for "${searchQuery}". Try a different keyword.`
                                        : "You haven't uploaded any candidates yet. Click 'Upload & Parse CV' to add your first candidate."
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                                        <TableRow>
                                            <TableHead className="font-semibold">Candidate Info</TableHead>
                                            <TableHead className="font-semibold">Contact</TableHead>
                                            <TableHead className="font-semibold">Skills</TableHead>
                                            <TableHead className="font-semibold">Applications</TableHead>
                                            <TableHead className="font-semibold text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {candidates.map((candidate) => (
                                            <TableRow key={candidate.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                <TableCell className="align-middle">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                            {candidate.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                                {candidate.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                                                <Clock className="w-3.5 h-3.5" />
                                                                Added {new Date(candidate.created_at).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="align-middle">
                                                    <div className="space-y-1">
                                                        <div className="text-sm flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                                            <Mail className="w-3.5 h-3.5" />
                                                            <span>{candidate.email}</span>
                                                        </div>
                                                        {candidate.phone && (
                                                            <div className="text-xs flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                <span>{candidate.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="align-middle max-w-xs">
                                                    <div className="flex flex-wrap gap-1">
                                                        {candidate.skills && candidate.skills.slice(0, 3).map((skill, i) => (
                                                            <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                        {candidate.skills && candidate.skills.length > 3 && (
                                                            <Badge variant="outline" className="text-xs font-normal">
                                                                +{candidate.skills.length - 3} more
                                                            </Badge>
                                                        )}
                                                        {(!candidate.skills || candidate.skills.length === 0) && (
                                                            <span className="text-gray-400 text-xs">—</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="align-middle">
                                                    {candidate.applications.length > 0 ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0">
                                                                {candidate.applications.length} applied
                                                            </Badge>
                                                            {candidate.applications[0].ai_score !== null && (
                                                                <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-0">
                                                                    Latest: {candidate.applications[0].ai_score}%
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <Badge variant="outline" className="text-gray-400 border-gray-200">
                                                            No applications
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="align-middle text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => openCandidateDetails(candidate)}
                                                            className="hover:bg-slate-100 dark:hover:bg-slate-800"
                                                        >
                                                            <Eye className="w-4 h-4 mr-1.5" />
                                                            View Profile
                                                        </Button>
                                                        {candidate.resume_path && (
                                                            <a
                                                                href={candidatesDownload({ candidate: candidate.id }).url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                                                >
                                                                    <Download className="w-4 h-4" />
                                                                </Button>
                                                            </a>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </Card>
                </div>
            </div>

            {/* Candidate Detail Drawer */}
            <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <SheetContent className="sm:max-w-2xl overflow-y-auto border-0 shadow-2xl bg-white dark:bg-gray-900 p-0">
                    {selectedCandidate && (
                        <div className="flex flex-col h-full">
                            {/* Sheet Header Banner */}
                            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                                <button
                                    onClick={() => setIsDetailOpen(false)}
                                    className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-2xl border border-white/20">
                                        {selectedCandidate.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <SheetTitle className="text-2xl font-bold text-white leading-tight">
                                            {selectedCandidate.name}
                                        </SheetTitle>
                                        <SheetDescription className="text-white/85 text-sm flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-4 h-4" />
                                                {selectedCandidate.email}
                                            </span>
                                            {selectedCandidate.phone && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-4 h-4" />
                                                    {selectedCandidate.phone}
                                                </span>
                                            )}
                                        </SheetDescription>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-6">
                                    {selectedCandidate.resume_path && (
                                        <a
                                            href={candidatesDownload({ candidate: selectedCandidate.id }).url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full sm:w-auto"
                                        >
                                            <Button className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-gray-100 font-semibold shadow-sm">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download CV
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Sheet Content Body */}
                            <div className="flex-1 p-6 space-y-6">
                                {/* Summary Section */}
                                {selectedCandidate.summary && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
                                            <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                            <span>Professional Summary</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                                            {selectedCandidate.summary}
                                        </p>
                                    </div>
                                )}

                                {/* Skills Section */}
                                {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            <span>Core Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 p-1">
                                            {selectedCandidate.skills.map((skill, index) => (
                                                <Badge key={index} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-0 py-1 px-2.5 text-xs font-normal">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Experience Section */}
                                {selectedCandidate.experience && selectedCandidate.experience.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
                                            <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            <span>Work Experience</span>
                                        </div>
                                        <div className="space-y-3 relative border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
                                            {selectedCandidate.experience.map((exp, index) => (
                                                <div key={index} className="relative group">
                                                    <div className="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white dark:border-gray-900 group-hover:scale-110 transition-transform"></div>
                                                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {exp}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Education Section */}
                                {selectedCandidate.education && selectedCandidate.education.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
                                            <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            <span>Education History</span>
                                        </div>
                                        <div className="space-y-3 relative border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
                                            {selectedCandidate.education.map((edu, index) => (
                                                <div key={index} className="relative group">
                                                    <div className="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white dark:border-gray-900 group-hover:scale-110 transition-transform"></div>
                                                    <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {edu}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Job Application History */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
                                        <Building2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                        <span>Job Application History</span>
                                    </div>
                                    {selectedCandidate.applications.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic bg-slate-50 dark:bg-slate-800/40 p-4 rounded-lg text-center border">
                                            This profile was created via direct upload. No job applications found.
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {selectedCandidate.applications.map((app) => (
                                                <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm gap-2">
                                                    <div>
                                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">
                                                            {app.job.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            <span>Applied {new Date(app.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {app.ai_score !== null && (
                                                            <Badge className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-0">
                                                                AI Score: {app.ai_score}%
                                                            </Badge>
                                                        )}
                                                        <Badge variant="outline" className="capitalize">
                                                            Quiz: {app.quiz_status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </GuestLayout>
    );
}
