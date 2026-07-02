import { Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { type SharedData } from '@/types';
import { Brain, LogIn, UserPlus, Users, Briefcase, LayoutGrid, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { login, register, dashboard } from '@/routes';
import { index as candidatesIndex } from '@/routes/candidates';
import AppFooter from '@/components/app-footer';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const user = auth?.user;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
            {/* Sticky Modern Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Left: Brand Logo & Navigation */}
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-2 shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Career Hub
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center space-x-1">
                            <Link 
                                href="/" 
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    page.url === '/' 
                                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 font-semibold' 
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <Briefcase className="w-4 h-4" />
                                    Jobs
                                </span>
                            </Link>
                            <Link 
                                href="/cv-matching" 
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    page.url.startsWith('/cv-matching') 
                                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 font-semibold' 
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4" />
                                    Match Jobs
                                </span>
                            </Link>
                            <Link 
                                href={candidatesIndex().url} 
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    page.url.startsWith('/candidates') 
                                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 font-semibold' 
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                <span className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    Candidates
                                </span>
                            </Link>
                            {user && (
                                <Link 
                                    href={dashboard().url} 
                                    className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <LayoutGrid className="w-4 h-4" />
                                        Dashboard
                                    </span>
                                </Link>
                            )}
                        </nav>
                    </div>

                    {/* Right: Auth Controls */}
                    <div className="flex items-center space-x-3">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative size-9 rounded-full p-0">
                                        <Avatar className="size-8 overflow-hidden rounded-full border border-slate-200/50 dark:border-gray-800/50">
                                            <AvatarImage src={user.avatar || ''} alt={user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href={login().url}>
                                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                        <LogIn className="w-4 h-4" />
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href={register().url}>
                                    <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex items-center gap-1.5 text-white shadow-md shadow-emerald-500/10">
                                        <UserPlus className="w-4 h-4" />
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <AppFooter />
        </div>
    );
}
