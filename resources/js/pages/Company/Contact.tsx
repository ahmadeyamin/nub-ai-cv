import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="Contact Us - Career Hub" />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                    <Input id="first-name" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                    <Input id="last-name" placeholder="Doe" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <Input id="email" type="email" placeholder="john@company.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                <Input id="subject" placeholder="How can we help?" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} />
                            </div>

                            <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">support@aicareerhub.com</p>
                                        <p className="text-gray-600 dark:text-gray-300">sales@aicareerhub.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">+1 (800) 123-4567</p>
                                        <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 6pm EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mt-1 mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            123 AI Boulevard, Tech District<br />
                                            San Francisco, CA 94105<br />
                                            United States
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Link */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need immediate answers?</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Check out our frequently asked questions page for quick solutions to common issues.
                            </p>
                            <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/30" asChild>
                                <a href="/faq">Visit FAQ Page</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
