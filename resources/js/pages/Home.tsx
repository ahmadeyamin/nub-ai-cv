import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import SearchJobs from '@/components/search-jobs';
import { MapPin, DollarSign, Clock, Briefcase, Search, Brain, TrendingUp, Users, Zap, Star, ArrowRight } from 'lucide-react';
import { login, register } from '@/routes';
import { create, show } from '@/routes/jobs';

interface Job {
	id: number;
	title: string;
	description: string;
	location: string;
	salary_range: string;
	type: string;
	created_at: string;
	user: {
		name: string;
	};
}

interface HomeProps {
	jobs: Job[];
}

export default function Home({ jobs }: HomeProps) {
	const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

	const handleFiltersChange = (filters: any) => {
		let filtered = jobs;

		// Filter by search query
		if (filters.query) {
			const query = filters.query.toLowerCase();
			filtered = filtered.filter(job => 
				job.title.toLowerCase().includes(query) ||
				job.description.toLowerCase().includes(query) ||
				job.user.name.toLowerCase().includes(query)
			);
		}

		// Filter by location
		if (filters.location) {
			const location = filters.location.toLowerCase();
			filtered = filtered.filter(job => 
				job.location.toLowerCase().includes(location)
			);
		}

		// Filter by job type
		if (filters.jobType) {
			filtered = filtered.filter(job => 
				job.type === filters.jobType
			);
		}

		// Filter by salary range
		if (filters.salaryRange) {
			filtered = filtered.filter(job => {
				if (!job.salary_range) return false;
				// Simple salary range filtering - could be enhanced
				return job.salary_range.includes(filters.salaryRange);
			});
		}

		setFilteredJobs(filtered);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
			<Head title="AI-Powered Job Board" />

			{/* Modern Navigation */}
			<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 sticky top-0 z-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
								<Brain className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								AI Career Hub
							</span>
						</div>
						<div className="flex items-center space-x-4">
							<Link href={login().url}>
								<Button variant="ghost" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
									Sign In
								</Button>
							</Link>
							<Link href={register().url}>
								<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
									Get Started
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
					<div className="text-center">
						<div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-sm font-medium mb-6">
							<Brain className="w-4 h-4 mr-2" />
							Powered by AI Resume Analysis
						</div>
						<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
							Find Your Dream Job with
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Precision</span>
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
							Our AI analyzes your resume against job requirements, giving you instant feedback on your match score and personalized recommendations to stand out.
						</p>

						<div className="flex flex-wrap justify-center gap-4">
							<Link href={register().url}>
								<Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
									<Users className="w-5 h-5 mr-2" />
									Find Jobs
								</Button>
							</Link>
							<Link href={create().url}>
								<Button size="lg" variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 px-8">
									<Briefcase className="w-5 h-5 mr-2" />
									Post a Job
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Search Section */}
			<section className="py-8 bg-white dark:bg-gray-800">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<SearchJobs onFiltersChange={handleFiltersChange} />
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
							Why Choose AI Career Hub?
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300">
							Experience the future of job searching with our intelligent matching system
						</p>
					</div>
					
					<div className="grid md:grid-cols-3 gap-8">
						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
									<Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<CardTitle className="text-xl">AI Resume Analysis</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									Get instant AI-powered analysis of your resume against job requirements. Receive match scores, strengths, and improvement suggestions.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
									<TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
								</div>
								<CardTitle className="text-xl">Smart Matching</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									Our advanced algorithms match you with positions that truly fit your skills and experience, increasing your chances of success.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
							<CardHeader>
								<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
									<Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
								</div>
								<CardTitle className="text-xl">Instant Feedback</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									Receive real-time feedback on your applications and track your progress with detailed analytics and insights.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Jobs Section */}
			<section className="py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center mb-8">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
								{filteredJobs.length !== jobs.length ? 'Search Results' : 'Latest Opportunities'}
							</h2>
							<p className="text-gray-600 dark:text-gray-300">
								{filteredJobs.length !== jobs.length 
									? `Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} matching your criteria`
									: 'Discover positions from top companies'
								}
							</p>
						</div>
						<Link href={register().url}>
							<Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
								View All Jobs
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</Link>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredJobs.map((job) => (
							<Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
								<CardHeader>
									<div className="flex justify-between items-start mb-4">
										<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
											{job.type}
										</Badge>
										<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
											<Clock className="w-4 h-4 mr-1" />
											{new Date(job.created_at).toLocaleDateString()}
										</div>
									</div>
									<CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
										{job.title}
									</CardTitle>
									<CardDescription className="text-gray-600 dark:text-gray-300">
										{job.user.name}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex flex-wrap gap-2">
										<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
											<MapPin className="w-4 h-4 mr-1" />
											{job.location}
										</div>
										{job.salary_range && (
											<div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
												<DollarSign className="w-4 h-4 mr-1" />
												{job.salary_range}
											</div>
										)}
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
										{job.description}
									</p>
									<div className="flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium">
										<Brain className="w-4 h-4 mr-1" />
										AI Analysis Available
									</div>
								</CardContent>
								<CardFooter>
									<Link href={show(job.id).url} className="w-full">
										<Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
											View Details
										</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>

					{filteredJobs.length === 0 && (
						<div className="text-center py-16">
							<div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
								{jobs.length === 0 ? (
									<Briefcase className="w-10 h-10 text-gray-400" />
								) : (
									<Search className="w-10 h-10 text-gray-400" />
								)}
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								{jobs.length === 0 ? 'No Jobs Available Yet' : 'No Jobs Found'}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								{jobs.length === 0 
									? 'Be the first to post an opportunity and start finding talented candidates'
									: 'Try adjusting your search criteria or filters to find more opportunities'
								}
							</p>
							{jobs.length === 0 ? (
								<Link href={create().url}>
									<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
										<Briefcase className="w-5 h-5 mr-2" />
										Post a Job
									</Button>
								</Link>
							) : (
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Try removing some filters or using different search terms
								</p>
							)}
						</div>
					)}
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-white mb-4">
						Ready to Transform Your Career?
					</h2>
					<p className="text-xl text-blue-100 mb-8">
						Join thousands of job seekers and employers using AI to make smarter hiring decisions
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link href={register().url}>
							<Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
								<Star className="w-5 h-5 mr-2" />
								Start Free Today
							</Button>
						</Link>
						<Link href={create().url}>
							<Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
								Learn More
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
