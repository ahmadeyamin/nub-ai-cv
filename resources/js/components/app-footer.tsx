import { Link } from '@inertiajs/react';
import { Brain, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

export default function AppFooter() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Career Hub
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                            Empowering your career journey with AI-driven job matching and advanced resume analysis.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                <span className="sr-only">GitHub</span>
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/candidates" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Browse Candidates
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Post a Job
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/faq" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Help Center / FAQ
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Career Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Resume Guides
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-base text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-slate-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-gray-400 dark:text-gray-500 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Career Hub. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
