import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import GuestLayout from '@/layouts/guest-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Brain, CheckCircle2, TrendingUp, Users } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <GuestLayout>
            <Head title="Employer Log In" />
            
            <div className="min-h-[calc(100vh-4rem)] flex items-stretch">
                {/* Left Side: Marketing/Info */}
                <div className="hidden lg:flex flex-1 w-full bg-gradient-to-br from-emerald-900 to-teal-900 text-white relative overflow-hidden items-center justify-center p-12">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-400 blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-teal-400 blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-lg">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                            <Brain className="w-8 h-8 text-emerald-300" />
                        </div>
                        <h1 className="text-4xl font-extrabold mb-6 leading-tight">
                            Hire Smarter with AI Precision
                        </h1>
                        <p className="text-emerald-100 text-lg mb-10 leading-relaxed">
                            Access our pool of top-tier talent. Our proprietary AI matching engine instantly ranks candidates based on their true potential and semantic fit for your role.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Instant AI Matching</h3>
                                    <p className="text-emerald-200 text-sm mt-1">Don't sift through hundreds of resumes. Let AI do the heavy lifting.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <TrendingUp className="w-6 h-6 text-emerald-400 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Hire 3x Faster</h3>
                                    <p className="text-emerald-200 text-sm mt-1">Our employers report an average of 65% reduction in time-to-hire.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Users className="w-6 h-6 text-emerald-400 mr-4 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white">Quality Candidates</h3>
                                    <p className="text-emerald-200 text-sm mt-1">Connect with professionals who are actively looking for their next big role.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-gray-900">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Log in to your employer account to manage jobs and candidates.</p>
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
                            resetOnSuccess={['password']}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Work Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="you@company.com"
                                                className="h-11"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">Password</Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="h-11"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center space-x-3 pt-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                            />
                                            <Label htmlFor="remember" className="font-normal text-gray-600 dark:text-gray-300">Remember me for 30 days</Label>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Sign In to Dashboard
                                    </Button>

                                    {canRegister && (
                                        <div className="pt-6 text-center text-gray-500 dark:text-gray-400">
                                            Don't have an employer account?{' '}
                                            <TextLink 
                                                href={register()} 
                                                tabIndex={5}
                                                className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                                            >
                                                Create one now
                                            </TextLink>
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>

                        {status && (
                            <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
