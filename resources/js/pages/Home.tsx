import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
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
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Head title="Home" />

			<div className="bg-white shadow dark:bg-gray-800">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
						AI CV Analyzer Job Board
					</h1>
					<div className="space-x-4">
						<Link href={login().url}>
							<Button variant="outline">Log in</Button>
						</Link>
						<Link href={register().url}>
							<Button>Register</Button>
						</Link>
					</div>
				</div>
			</div>

			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{jobs.map((job) => (
							<Card key={job.id} className="hover:shadow-lg transition-shadow">
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<CardTitle className="text-xl font-bold">{job.title}</CardTitle>
											<CardDescription className="mt-1">{job.user.name}</CardDescription>
										</div>
										<Badge variant="secondary">{job.type}</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
										<div className="flex items-center">
											<MapPin className="mr-2 h-4 w-4" />
											{job.location}
										</div>
										{job.salary_range && (
											<div className="flex items-center">
												<DollarSign className="mr-2 h-4 w-4" />
												{job.salary_range}
											</div>
										)}
										<div className="flex items-center">
											<Clock className="mr-2 h-4 w-4" />
											{new Date(job.created_at).toLocaleDateString()}
										</div>
									</div>
									<p className="mt-4 text-sm text-gray-500 line-clamp-3">
										{job.description}
									</p>
								</CardContent>
								<CardFooter>
									<Link href={show(job.id).url} className="w-full">
										<Button className="w-full">View Details</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>
					{jobs.length === 0 && (
						<div className="text-center py-12">
							<Briefcase className="mx-auto h-12 w-12 text-gray-400" />
							<h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No jobs found</h3>
							<p className="mt-1 text-sm text-gray-500">Get started by creating a new job posting.</p>
							<div className="mt-6">
								<Link href={create().url}>
									<Button>Post a Job</Button>
								</Link>
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
