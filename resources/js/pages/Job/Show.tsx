import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, DollarSign, Clock, Building, Brain, Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Star } from 'lucide-react';
import { store } from '@/routes/applications';
import { home, login } from '@/routes';

interface Job {
	id: number;
	title: string;
	description: string;
	location: string;
	salary_range: string;
	type: string;
	created_at: string;
	user_id: number;
	user: {
		name: string;
	};
}

interface ShowJobProps {
	job: Job;
}

export default function ShowJob({ job }: ShowJobProps) {
	const page = usePage();
	const auth = (page.props as any).auth || {};
	const { data, setData, post, processing, errors, reset } = useForm({
		resume: null as File | null,
		cover_note: '',
	});

	const submitApplication = (e: React.FormEvent) => {
		e.preventDefault();
		post(store(job.id).url, {
			onSuccess: () => reset(),
		});
	};

	const isOwner = auth.user && auth.user.id === job.user_id;

	return (
		<>
			<Head title={`${job.title} - AI Career Hub`} />

			{/* Back to Jobs Link */}
			<div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
					<Link href={home().url} className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
						← Back to Jobs
					</Link>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Job Header Card */}
						<Card className="border-0 shadow-lg">
							<CardHeader className="pb-6">
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-3">
											<Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
												{job.type}
											</Badge>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<Clock className="w-4 h-4 mr-1" />
												Posted {new Date(job.created_at).toLocaleDateString()}
											</div>
										</div>
										<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
											{job.title}
										</h1>
										<div className="flex items-center text-gray-600 dark:text-gray-300">
											<Building className="w-5 h-5 mr-2" />
											<span className="font-medium text-lg">{job.user.name}</span>
										</div>
									</div>
								</div>

								{/* Job Details */}
								<div className="flex flex-wrap gap-3 pt-4">
									<div className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
										<MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
										<span className="text-sm font-medium text-blue-700 dark:text-blue-300">{job.location}</span>
									</div>
									{job.salary_range && (
										<div className="flex items-center px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
											<DollarSign className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
											<span className="text-sm font-medium text-green-700 dark:text-green-300">{job.salary_range}</span>
										</div>
									)}
								</div>
							</CardHeader>

							<Separator />

							<CardContent className="pt-6">
								<div className="space-y-6">
									<div>
										<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
										<div className="prose prose-lg dark:prose-invert max-w-none">
											<div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
												{job.description}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* AI Analysis Feature Card */}
						<Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
										<Brain className="w-6 h-6 text-white" />
									</div>
									<div>
										<CardTitle className="text-xl">AI-Powered Resume Analysis</CardTitle>
										<CardDescription className="text-gray-600 dark:text-gray-300">
											Get instant feedback on how well your resume matches this position
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="grid sm:grid-cols-3 gap-4">
									<div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
										<TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
										<h3 className="font-semibold text-gray-900 dark:text-white">Match Score</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">0-100 compatibility rating</p>
									</div>
									<div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
										<CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
										<h3 className="font-semibold text-gray-900 dark:text-white">Strengths</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">Your key qualifications</p>
									</div>
									<div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
										<AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
										<h3 className="font-semibold text-gray-900 dark:text-white">Improvements</h3>
										<p className="text-sm text-gray-600 dark:text-gray-300">Areas to enhance</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Application Form */}
						{!isOwner ? (
							<Card className="border-0 shadow-lg sticky top-24">
								<CardHeader className="text-center">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
										<Upload className="w-6 h-6 text-white" />
									</div>
									<CardTitle className="text-xl">Apply Now</CardTitle>
									<CardDescription>
										Submit your resume for instant AI analysis
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={submitApplication} className="space-y-4">
										<div>
											<Label htmlFor="resume" className="flex items-center gap-2 mb-2">
												<FileText className="w-4 h-4" />
												Resume (PDF)
											</Label>
											<div className="relative">
												<Input
													id="resume"
													type="file"
													accept=".pdf"
													onChange={(e) => setData('resume', e.target.files ? e.target.files[0] : null)}
													className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300"
													required
												/>
											</div>
											{errors.resume && (
												<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
													<AlertCircle className="w-4 h-4" />
													{errors.resume}
												</div>
											)}
										</div>

										<div>
											<Label htmlFor="cover_note" className="flex items-center gap-2 mb-2">
												<FileText className="w-4 h-4" />
												Cover Note (Optional)
											</Label>
											<Textarea
												id="cover_note"
												value={data.cover_note}
												onChange={(e) => setData('cover_note', e.target.value)}
												placeholder="Tell us why you're perfect for this role..."
												className="resize-none"
												rows={4}
											/>
											{errors.cover_note && (
												<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
													<AlertCircle className="w-4 h-4" />
													{errors.cover_note}
												</div>
											)}
										</div>

										<Button 
											type="submit" 
											className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3" 
											disabled={processing}
										>
											{processing ? (
												<div className="flex items-center justify-center">
													<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
													Processing...
												</div>
											) : (
												<div className="flex items-center justify-center">
													<Brain className="w-4 h-4 mr-2" />
													Submit & Analyze Resume
												</div>
											)}
										</Button>
									</form>

									<div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
										<div className="flex items-start gap-2">
											<Brain className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
											<p className="text-xs text-blue-700 dark:text-blue-300">
												Your resume will be instantly analyzed by our AI to provide personalized feedback and match score.
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						) : (
							<Card className="border-0 shadow-lg">
								<CardContent className="pt-6 text-center">
									<div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
										<Star className="w-8 h-8 text-gray-400" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
										Your Job Posting
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										You posted this job. View your dashboard to see applications and AI analysis results.
									</p>
									<Link href="/dashboard">
										<Button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
											View Dashboard
										</Button>
									</Link>
								</CardContent>
							</Card>
						)}

						{/* Quick Stats */}
						<Card className="border-0 shadow-lg">
							<CardHeader>
								<CardTitle className="text-lg">Application Stats</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600 dark:text-gray-300">Total Applications</span>
										<span className="font-semibold text-gray-900 dark:text-white">--</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600 dark:text-gray-300">Avg. Match Score</span>
										<span className="font-semibold text-gray-900 dark:text-white">--</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600 dark:text-gray-300">Top Candidates</span>
										<span className="font-semibold text-gray-900 dark:text-white">--</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
