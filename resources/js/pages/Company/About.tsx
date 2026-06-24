import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { Brain, Users, Globe, Target } from 'lucide-react';

export default function About() {
    return (
        <GuestLayout>
            <Head title="About Us - Career Hub" />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Revolutionizing the Future of Hiring
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        At Career Hub, we believe that finding the perfect job or candidate shouldn't be a game of chance. By combining advanced artificial intelligence with human-centric design, we're building the most efficient and accurate career platform in the world.
                    </p>
                </div>

                {/* Values Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 text-center">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI-Powered Accuracy</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Our proprietary algorithms ensure precise matching between candidates and roles.</p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 text-center">
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">People First</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Behind every resume is a person. We prioritize human potential over keywords.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 text-center">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Connecting talent with opportunities across borders and time zones.</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700 text-center">
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mission Driven</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Dedicated to reducing hiring bias and increasing diverse representation.</p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>
                            Career Hub was founded by a team of engineers and HR professionals who were frustrated by the inefficiencies of modern recruiting. We noticed that thousands of highly qualified candidates were being overlooked simply because their resumes weren't formatted perfectly for legacy Applicant Tracking Systems (ATS).
                        </p>
                        <p>
                            We set out to build a platform that actually understands the context of a person's experience, skills, and potential. By leveraging cutting-edge Large Language Models, our platform analyzes career history intelligently, identifying the true potential of a candidate and matching them with companies where they will thrive.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
