import { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, DollarSign, Clock, Building, Brain, Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Star, Users } from 'lucide-react';
import { store } from '@/routes/applications';
import { home, login } from '@/routes';
import GuestLayout from '@/layouts/guest-layout';

interface Application {
	id: number;
	ai_score: number | null;
	created_at: string;
}

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
	applications?: Application[];
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

	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setData('resume', e.dataTransfer.files[0]);
		}
	};

	const submitApplication = (e: React.FormEvent) => {
		e.preventDefault();
		post(store(job.id).url, {
			onSuccess: () => reset(),
		});
	};

	const isOwner = auth.user && auth.user.id === job.user_id;

	return (
		<GuestLayout>
			<Head title={`${job.title} - Career Hub`} />

			{/* Back to Jobs Link */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-2">
				<Link href={home().url} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
					← Back to Jobs
				</Link>
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
											<Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
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
									<div className="flex items-center px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
										<MapPin className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
										<span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{job.location}</span>
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
						<Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20">
							<CardHeader>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center">
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
										<CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
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
									<div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
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
											<div 
												className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
													isDragging 
														? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-[1.02]' 
														: 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
												}`}
												onDragOver={handleDragOver}
												onDragLeave={handleDragLeave}
												onDrop={handleDrop}
												onClick={() => document.getElementById('resume')?.click()}
											>
												<Input
													id="resume"
													type="file"
													accept=".pdf"
													onChange={(e) => setData('resume', e.target.files ? e.target.files[0] : null)}
													className="hidden"
												/>
												
												{data.resume ? (
													<div className="flex flex-col items-center justify-center space-y-3 animate-in fade-in zoom-in duration-300">
														<div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
															<FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
														</div>
														<div>
															<div className="text-sm font-semibold text-gray-900 dark:text-white max-w-[200px] truncate">
																{data.resume.name}
															</div>
															<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
																{(data.resume.size / 1024 / 1024).toFixed(2)} MB • Click to replace
															</div>
														</div>
													</div>
												) : (
													<div className="flex flex-col items-center justify-center space-y-3">
														<div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
															<Upload className="w-6 h-6 text-slate-500 dark:text-slate-400" />
														</div>
														<div>
															<div className="text-sm font-medium text-gray-900 dark:text-white">
																<span className="text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag and drop
															</div>
															<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
																PDF only (Max. 10MB)
															</div>
														</div>
													</div>
												)}
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
											className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3" 
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

									<div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
										<div className="flex items-start gap-2">
											<Brain className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
											<p className="text-xs text-emerald-700 dark:text-emerald-300">
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
										<Button className="mt-4 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
											View Dashboard
										</Button>
									</Link>
								</CardContent>
							</Card>
						)}

						{/* Quick Stats */}
						<Card className="border-0 shadow-lg overflow-hidden">
							<CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
								<CardTitle className="text-lg flex items-center">
									<TrendingUp className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
									Application Stats
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-6">
								{(() => {
									const apps = job.applications || [];
									const total = apps.length;
									const scoredApps = apps.filter(a => a.ai_score !== null);
									const avgScore = scoredApps.length > 0 
										? Math.round(scoredApps.reduce((sum, a) => sum + (a.ai_score || 0), 0) / scoredApps.length) 
										: 0;
									const topScore = scoredApps.length > 0 ? Math.max(...scoredApps.map(a => a.ai_score || 0)) : 0;

									return (
										<div className="space-y-6">
											{/* Total Applicants */}
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
														<Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applicants</p>
														<p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
													</div>
												</div>
											</div>

											<Separator />

											{/* Scores */}
											<div className="space-y-4">
												<div>
													<div className="flex justify-between items-center mb-1.5">
														<span className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Match</span>
														<span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{avgScore}%</span>
													</div>
													<div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
														<div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${avgScore}%` }}></div>
													</div>
												</div>

												<div>
													<div className="flex justify-between items-center mb-1.5">
														<span className="text-sm font-medium text-gray-600 dark:text-gray-300">Top Candidate</span>
														<span className="text-sm font-bold text-teal-600 dark:text-teal-400">{topScore}%</span>
													</div>
													<div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
														<div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${topScore}%` }}></div>
													</div>
												</div>
											</div>

											{total > 0 && isOwner && (
												<div className="pt-2">
													<Link href="/dashboard">
														<Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30">
															Review {total} Application{total !== 1 ? 's' : ''}
														</Button>
													</Link>
												</div>
											)}
										</div>
									);
								})()}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</GuestLayout>
	);
}
