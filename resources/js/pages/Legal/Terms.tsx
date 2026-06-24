import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <GuestLayout>
            <Head title="Terms of Service - Career Hub" />
            
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-6">
                            By accessing or using the Career Hub platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Description of Service</h2>
                        <p className="mb-6">
                            Career Hub provides an online platform that connects employers with job seekers using artificial intelligence for resume parsing and matching. 
                            We reserve the right to modify, suspend, or discontinue the service with or without notice at any time.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. User Accounts</h2>
                        <p className="mb-4">When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>You are responsible for safeguarding the password that you use to access the service.</li>
                            <li>You agree not to disclose your password to any third party.</li>
                            <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Content</h2>
                        <p className="mb-6">
                            Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Intellectual Property</h2>
                        <p className="mb-6">
                            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Career Hub and its licensors.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Limitation of Liability</h2>
                        <p className="mb-6">
                            In no event shall Career Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Contact Us</h2>
                        <p className="mb-6">
                            If you have any questions about these Terms, please contact us at legal@aicareerhub.com.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
