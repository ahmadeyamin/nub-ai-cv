import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { create, store } from '@/routes/jobs';

export default function CreateJob() {
	const { data, setData, post, processing, errors } = useForm({
		title: '',
		description: '',
		location: '',
		salary_range: '',
		type: 'Full-time',
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		post(store().url);
	};

	return (
		<AppLayout breadcrumbs={[{ title: 'Post a Job', href: create() }]}>
			<Head title="Post a Job" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							<h2 className="mb-6 text-2xl font-semibold">Post a New Job</h2>

							<form onSubmit={submit} className="space-y-6">
								<div>
									<Label htmlFor="title">Job Title</Label>
									<Input
										id="title"
										value={data.title}
										onChange={(e) => setData('title', e.target.value)}
										className="mt-1 block w-full"
										required
									/>
									{errors.title && <div className="text-red-500">{errors.title}</div>}
								</div>

								<div>
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										value={data.description}
										onChange={(e) => setData('description', e.target.value)}
										className="mt-1 block w-full"
										required
									/>
									{errors.description && (
										<div className="text-red-500">{errors.description}</div>
									)}
								</div>

								<div>
									<Label htmlFor="location">Location</Label>
									<Input
										id="location"
										value={data.location}
										onChange={(e) => setData('location', e.target.value)}
										className="mt-1 block w-full"
										required
									/>
									{errors.location && (
										<div className="text-red-500">{errors.location}</div>
									)}
								</div>

								<div>
									<Label htmlFor="salary_range">Salary Range</Label>
									<Input
										id="salary_range"
										value={data.salary_range}
										onChange={(e) => setData('salary_range', e.target.value)}
										className="mt-1 block w-full"
										placeholder="e.g. $50k - $70k"
									/>
									{errors.salary_range && (
										<div className="text-red-500">{errors.salary_range}</div>
									)}
								</div>

								<div>
									<Label htmlFor="type">Job Type</Label>
									<Select
										value={data.type}
										onValueChange={(value) => setData('type', value)}
									>
										<SelectTrigger className="w-full">
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
									{errors.type && <div className="text-red-500">{errors.type}</div>}
								</div>

								<div className="flex items-center justify-end">
									<Button type="submit" disabled={processing}>
										Post Job
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
