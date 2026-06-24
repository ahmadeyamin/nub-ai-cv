import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy - Career Hub" />
            
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">Last updated: {new Date().toLocaleDateString()}</p>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Introduction</h2>
                        <p className="mb-6">
                            At Career Hub, we are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our products and services.
                            This Privacy Policy explains our practices regarding the collection, use, and disclosure of information that we receive when you use our platform.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Information We Collect</h2>
                        <p className="mb-4">We collect information to provide better services to all our users. We collect information in the following ways:</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li><strong>Information you give us.</strong> For example, our services require you to sign up for an account. When you do, we'll ask for personal information, like your name, email address, telephone number, and resume.</li>
                            <li><strong>Information we get from your use of our services.</strong> We collect information about the services that you use and how you use them, like when you view and interact with job postings.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. How We Use Information We Collect</h2>
                        <p className="mb-6">
                            We use the information we collect from all our services to provide, maintain, protect and improve them, to develop new ones, and to protect Career Hub and our users.
                            Specifically, we use your resume data to power our AI matching algorithms, which connect you with relevant job opportunities.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Information We Share</h2>
                        <p className="mb-6">
                            We do not share personal information with companies, organizations and individuals outside of Career Hub unless one of the following circumstances applies:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li><strong>With your consent.</strong> We will share personal information with employers only when you explicitly apply for their job postings.</li>
                            <li><strong>For legal reasons.</strong> We will share personal information with companies, organizations or individuals outside of Career Hub if we have a good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process or enforceable governmental request.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
                        <p className="mb-6">
                            If you have any questions about this Privacy Policy, please contact us at privacy@aicareerhub.com.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
