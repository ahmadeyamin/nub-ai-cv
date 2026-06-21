import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { 
	Brain, 
	Briefcase, 
	MapPin, 
	DollarSign, 
	Clock, 
	FileText, 
	Users, 
	Target, 
	Lightbulb,
	ArrowRight,
	CheckCircle,
	AlertCircle,
	HelpCircle
} from 'lucide-react';
import { create, store } from '@/routes/jobs';

export default function CreateJob() {
	const { data, setData, post, processing, errors } = useForm({
		title: '',
		description: '',
		location: '',
		salary_range: '',
		type: 'Full-time',
		quiz_questions_count: 10,
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		post(store().url);
	};

	return (
		<AppLayout breadcrumbs={[{ title: 'Post a Job', href: create().url }]}>
			<Head title="Post a Job - AI Career Hub" />

			<div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-sm font-medium mb-4">
							<Brain className="w-4 h-4 mr-2" />
							AI-Powered Job Posting
						</div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
							Create a New Job Posting
						</h1>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Post your job opening and start receiving AI-analyzed applications from qualified candidates. 
							Our intelligent matching system helps you find the perfect fit.
						</p>
					</div>

					{/* AI Benefits Card */}
					<Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 mb-8">
						<CardContent className="p-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
									<Brain className="w-6 h-6 text-white" />
								</div>
								<div className="flex-1">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
										Smart Candidate Matching
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Every application will be automatically analyzed by our AI, providing match scores and detailed insights to help you make better hiring decisions.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Main Form */}
					<Card className="border-0 shadow-lg">
						<CardHeader className="pb-6">
							<CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
								<Briefcase className="w-6 h-6" />
								Job Details
							</CardTitle>
							<CardDescription>
								Fill in the information below to create your job posting. All fields marked with * are required.
							</CardDescription>
						</CardHeader>

						<CardContent className="space-y-8">
							<form onSubmit={submit} className="space-y-8">
								{/* Basic Information */}
								<div className="space-y-6">
									<div>
										<Label htmlFor="title" className="flex items-center gap-2 text-base font-semibold">
											<FileText className="w-4 h-4" />
											Job Title *
										</Label>
										<Input
											id="title"
											value={data.title}
											onChange={(e) => setData('title', e.target.value)}
											placeholder="e.g. Senior Frontend Developer, Marketing Manager, Data Analyst"
											className="mt-2 text-base"
											required
										/>
										{errors.title && (
											<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
												<AlertCircle className="w-4 h-4" />
												{errors.title}
											</div>
										)}
									</div>

									<div>
										<Label htmlFor="description" className="flex items-center gap-2 text-base font-semibold">
											<FileText className="w-4 h-4" />
											Job Description *
										</Label>
										<Textarea
											id="description"
											value={data.description}
											onChange={(e) => setData('description', e.target.value)}
											placeholder="Provide a detailed description of the role, responsibilities, requirements, and what you're looking for in a candidate..."
											className="mt-2 text-base min-h-[200px] resize-none"
											required
										/>
										{errors.description && (
											<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
												<AlertCircle className="w-4 h-4" />
												{errors.description}
											</div>
										)}
										<div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
											<div className="flex items-start gap-2">
												<Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
												<p className="text-sm text-blue-700 dark:text-blue-300">
													<strong>AI Tip:</strong> Include specific skills, experience levels, and qualifications. 
													The more detailed your description, the better our AI can match candidates.
												</p>
											</div>
										</div>
									</div>
								</div>

								<Separator />

								{/* Job Details */}
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<Label htmlFor="location" className="flex items-center gap-2 text-base font-semibold">
												<MapPin className="w-4 h-4" />
												Location *
											</Label>
											<Input
												id="location"
												value={data.location}
												onChange={(e) => setData('location', e.target.value)}
												placeholder="e.g. New York, NY; Remote; London, UK"
												className="mt-2 text-base"
												required
											/>
											{errors.location && (
												<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
													<AlertCircle className="w-4 h-4" />
													{errors.location}
												</div>
											)}
										</div>

										<div>
											<Label htmlFor="type" className="flex items-center gap-2 text-base font-semibold">
												<Clock className="w-4 h-4" />
												Job Type *
											</Label>
											<Select
												value={data.type}
												onValueChange={(value) => setData('type', value)}
											>
												<SelectTrigger className="mt-2 text-base">
													<SelectValue placeholder="Select job type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Full-time">Full-time</SelectItem>
													<SelectItem value="Part-time">Part-time</SelectItem>
													<SelectItem value="Contract">Contract</SelectItem>
													<SelectItem value="Freelance">Freelance</SelectItem>
													<SelectItem value="Internship">Internship</SelectItem>
												</SelectContent>
											</Select>
											{errors.type && (
												<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
													<AlertCircle className="w-4 h-4" />
													{errors.type}
												</div>
											)}
										</div>
									</div>

									<div>
										<Label htmlFor="salary_range" className="flex items-center gap-2 text-base font-semibold">
											<DollarSign className="w-4 h-4" />
											Salary Range
										</Label>
										<Input
											id="salary_range"
											value={data.salary_range}
											onChange={(e) => setData('salary_range', e.target.value)}
											placeholder="e.g. $50k - $70k, $60,000+, Competitive"
											className="mt-2 text-base"
										/>
										{errors.salary_range && (
											<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
												<AlertCircle className="w-4 h-4" />
												{errors.salary_range}
											</div>
										)}
										<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
											Optional but recommended - helps attract qualified candidates
										</p>
									</div>
								</div>

								<Separator />

								{/* Quiz Configuration */}
								<div className="p-5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30">
									<div className="flex items-center gap-2 mb-4">
										<HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
										<h3 className="text-base font-semibold text-gray-900 dark:text-white">AI Quiz Configuration</h3>
									</div>
									<div>
										<Label htmlFor="quiz_questions_count" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
											Number of Quiz Questions *
										</Label>
										<div className="flex items-center gap-4 mt-2">
											<input
												id="quiz_questions_count"
												type="range"
												min={5}
												max={50}
												step={5}
												value={data.quiz_questions_count}
												onChange={(e) => setData('quiz_questions_count', parseInt(e.target.value))}
												className="flex-1 accent-purple-600"
											/>
											<span className="min-w-[80px] text-center font-bold text-purple-700 dark:text-purple-300 text-lg">
												{data.quiz_questions_count} Q / {data.quiz_questions_count} min
											</span>
										</div>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											The quiz timer equals the question count in minutes (e.g. 10 questions = 10 minutes). Range: 5–50.
										</p>
										{errors.quiz_questions_count && (
											<div className="text-red-500 text-sm mt-1 flex items-center gap-1">
												<AlertCircle className="w-4 h-4" />
												{errors.quiz_questions_count}
											</div>
										)}
									</div>
								</div>

								{/* What Happens Next */}
								<Card className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
									<CardHeader className="pb-4">
										<CardTitle className="text-lg flex items-center gap-2">
											<Target className="w-5 h-5 text-purple-600" />
											What Happens Next?
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
											<div>
												<p className="font-medium text-gray-900 dark:text-white">Your job goes live</p>
												<p className="text-sm text-gray-600 dark:text-gray-300">Candidates can immediately find and apply to your posting</p>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
											<div>
												<p className="font-medium text-gray-900 dark:text-white">AI analyzes applications</p>
												<p className="text-sm text-gray-600 dark:text-gray-300">Each resume gets a match score and detailed analysis</p>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
											<div>
												<p className="font-medium text-gray-900 dark:text-white">Review in your dashboard</p>
												<p className="text-sm text-gray-600 dark:text-gray-300">See ranked candidates and AI insights to make informed decisions</p>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Submit Button */}
								<div className="flex flex-col sm:flex-row gap-4 pt-4">
									<Button 
										type="submit" 
										className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-base"
										disabled={processing}
									>
										{processing ? (
											<div className="flex items-center justify-center">
												<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
												Posting Job...
											</div>
										) : (
											<div className="flex items-center justify-center">
												<Users className="w-5 h-5 mr-2" />
												Post Job & Start Receiving Applications
											</div>
										)}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</AppLayout>
	);
}
