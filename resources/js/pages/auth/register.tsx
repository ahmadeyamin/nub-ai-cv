import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import GuestLayout from '@/layouts/guest-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { Building2, Sparkles, Target, Zap } from 'lucide-react';

export default function Register() {
    return (
        <GuestLayout>
            <Head title="Create Employer Account" />
            
            <div className="min-h-[calc(100vh-4rem)] flex items-stretch">
                {/* Left Side: Marketing/Info */}
                <div className="hidden lg:flex flex-1 w-full bg-gradient-to-br from-teal-900 to-emerald-900 text-white relative overflow-hidden items-center justify-center p-12">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-emerald-400 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-teal-400 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-lg">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                            <Building2 className="w-8 h-8 text-teal-300" />
                        </div>
                        <h1 className="text-4xl font-extrabold mb-6 leading-tight">
                            Start Building Your Dream Team
                        </h1>
                        <p className="text-teal-100 text-lg mb-10 leading-relaxed">
                            Join thousands of innovative companies using Career Hub to discover and hire exceptional talent faster than ever before.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <Target className="w-6 h-6 text-teal-400 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Targeted Reach</h3>
                                    <p className="text-teal-200 text-sm mt-1">Get your job postings in front of highly qualified, relevant professionals immediately.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Zap className="w-6 h-6 text-teal-400 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Frictionless Hiring</h3>
                                    <p className="text-teal-200 text-sm mt-1">Candidates apply instantly without needing to create an account, dramatically increasing application rates.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Sparkles className="w-6 h-6 text-teal-400 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">AI-Powered Insights</h3>
                                    <p className="text-teal-200 text-sm mt-1">Every application comes with a deep semantic analysis and match score out of the box.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-gray-900">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an Account</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign up to start posting jobs and hiring top talent.</p>
                        </div>

                        <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl text-center lg:text-left">
                            <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                                💼 <strong className="font-bold">Employer Account Only</strong>
                                <br className="hidden lg:block" />
                                <span className="opacity-90 mt-1 inline-block">Candidates do not need an account to apply!</span>
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="space-y-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Company / Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Acme Corp."
                                                className="h-11"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Work Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="you@company.com"
                                                className="h-11"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    tabIndex={3}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    className="h-11"
                                                />
                                                <InputError message={errors.password} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    name="password_confirmation"
                                                    placeholder="••••••••"
                                                    className="h-11"
                                                />
                                                <InputError message={errors.password_confirmation} />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 mt-2 text-base font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg shadow-teal-500/25"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                        disabled={processing}
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Create Employer Account
                                    </Button>

                                    <div className="pt-6 text-center text-gray-500 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <TextLink 
                                            href={login()} 
                                            tabIndex={6}
                                            className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                                        >
                                            Log in instead
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
