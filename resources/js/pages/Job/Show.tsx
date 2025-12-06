import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Building } from 'lucide-react';
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
	const { auth } = usePage().props;
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
		<AppLayout breadcrumbs={[{ title: 'Jobs', href: home().url }, { title: job.title, href: '#' }]}>
			<Head title={job.title} />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2 space-y-6">
							<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
								<div className="p-6 text-gray-900 dark:text-gray-100">
									<div className="flex justify-between items-start mb-6">
										<div>
											<h1 className="text-3xl font-bold">{job.title}</h1>
											<div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
												<Building className="mr-2 h-5 w-5" />
												<span className="font-medium">{job.user.name}</span>
											</div>
										</div>
										<Badge className="text-lg px-3 py-1">{job.type}</Badge>
									</div>

									<div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
										<div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
											<MapPin className="mr-2 h-4 w-4" />
											{job.location}
										</div>
										{job.salary_range && (
											<div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
												<DollarSign className="mr-2 h-4 w-4" />
												{job.salary_range}
											</div>
										)}
										<div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
											<Clock className="mr-2 h-4 w-4" />
											Posted {new Date(job.created_at).toLocaleDateString()}
										</div>
									</div>

									<div className="prose dark:prose-invert max-w-none">
										<h3 className="text-xl font-semibold mb-4">Job Description</h3>
										<div className="whitespace-pre-wrap">{job.description}</div>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-1">
							{!isOwner && auth.user ? (
								<Card>
									<CardHeader>
										<CardTitle>Apply for this Position</CardTitle>
									</CardHeader>
									<CardContent>
										<form onSubmit={submitApplication} className="space-y-4">
											<div>
												<Label htmlFor="resume">Resume (PDF)</Label>
												<Input
													id="resume"
													type="file"
													accept=".pdf"
													onChange={(e) => setData('resume', e.target.files ? e.target.files[0] : null)}
													className="mt-1 block w-full"
													required
												/>
												{errors.resume && <div className="text-red-500 text-sm mt-1">{errors.resume}</div>}
											</div>

											<div>
												<Label htmlFor="cover_note">Cover Note (Optional)</Label>
												<Textarea
													id="cover_note"
													value={data.cover_note}
													onChange={(e) => setData('cover_note', e.target.value)}
													className="mt-1 block w-full"
													rows={4}
												/>
												{errors.cover_note && (
													<div className="text-red-500 text-sm mt-1">{errors.cover_note}</div>
												)}
											</div>

											<Button type="submit" className="w-full" disabled={processing}>
												Submit Application
											</Button>
										</form>
									</CardContent>
								</Card>
							) : !auth.user ? (
								<Card>
									<CardContent className="pt-6">
										<div className="text-center">
											<h3 className="text-lg font-semibold mb-2">Want to apply?</h3>
											<p className="text-gray-600 dark:text-gray-400 mb-4">
												Please log in or register to submit your application.
											</p>
											<Button className="w-full" asChild>
												<a href={login().url}>Log in to Apply</a>
											</Button>
										</div>
									</CardContent>
								</Card>
							) : (
								<Card>
									<CardContent className="pt-6">
										<div className="text-center text-gray-600 dark:text-gray-400">
											You posted this job.
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
