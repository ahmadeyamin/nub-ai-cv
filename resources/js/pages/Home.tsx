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
import GuestLayout from '@/layouts/guest-layout';
import candidates from '@/routes/candidates';

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
		<GuestLayout>
			<Head title="AI-Powered Job Board" />

			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
					<div className="text-center">
						<div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 text-sm font-medium mb-6">
							<Brain className="w-4 h-4 mr-2" />
							Powered by AI Resume Analysis
						</div>
						<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
							Find Your Dream Job with
							<span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> AI Precision</span>
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
							Our AI analyzes your resume against job requirements, giving you instant feedback on your match score and personalized recommendations to stand out.
						</p>

						<div className="flex flex-wrap justify-center gap-4">
							<Link href={candidates.index().url}>
								<Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8">
									<Users className="w-5 h-5" />
									See candidates
								</Button>
							</Link>
							<Link href={create().url}>
								<Button size="lg" variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 px-8">
									<Briefcase className="w-5 h-5" />
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
					
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredJobs.map((job) => (
							<Card key={job.id} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
								<CardHeader>
									<div className="flex justify-between items-start mb-4">
										<Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
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
									<div className="flex items-center text-sm text-teal-600 dark:text-teal-400 font-medium">
										<Brain className="w-4 h-4 mr-1" />
										AI Analysis Available
									</div>
								</CardContent>
								<CardFooter>
									<Link href={show(job.id).url} className="w-full">
										<Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
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
									<Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8">
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
			<section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold text-white mb-4">
						Ready to Transform Your Career?
					</h2>
					<p className="text-xl text-emerald-100 mb-8">
						Join thousands of job seekers and employers using AI to make smarter hiring decisions
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link href={register().url}>
							<Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8">
								<Star className="w-5 h-5 mr-2" />
								Start Free Today
							</Button>
						</Link>
						<Link href={create().url}>
							<Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-emerald-600 px-8">
								Learn More
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</GuestLayout>
	);
}
