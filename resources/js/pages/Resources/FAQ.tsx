import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
    return (
        <GuestLayout>
            <Head title="FAQ - Career Hub" />
            
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Everything you need to know about the product and how it works.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-700">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                            How does the AI resume matching work?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                            Our AI analyzes the semantic meaning of your resume, understanding your experience, skills, and context rather than just doing basic keyword matching. It compares this deep understanding against the specific requirements, context, and nuances of a job description to provide a highly accurate compatibility score.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                            Is Career Hub free for job seekers?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                            Yes! Creating a profile, uploading your resume, and applying to jobs is completely free for candidates. We also provide basic AI analysis of your resume match for free to help you put your best foot forward.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                            How much does it cost to post a job?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                            Employers can post their first job for free to try out our AI candidate ranking system. After that, we offer various tiered plans based on hiring volume. Please visit our Pricing page or contact sales for detailed information.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                            Are my details kept private?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                            Absolutely. We take data privacy very seriously. Your resume and personal details are only shared with employers when you explicitly apply for their job postings. We never sell your data to third-party marketing agencies.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white text-lg">
                            Can I upload multiple resumes?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                            Currently, we recommend uploading your master resume to your profile. However, when applying for specific jobs, you have the option to upload a tailored resume just for that specific application.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                
                <div className="mt-12 text-center bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 h-10 px-6 py-2">
                        Get in touch
                    </a>
                </div>
            </div>
        </GuestLayout>
    );
}
