'use client';
import { GENERAL_INFO } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MENU_LINKS = [
    { name: 'Home',       url: '/' },
    { name: 'About Me',   url: '/#about-me' },
    { name: 'Experience', url: '/#my-experience' },
    { name: 'Education',  url: '/#education' },
    { name: 'Projects',   url: '/#selected-projects' },
];

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
);

const ThemeToggle = () => {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isDark = document.documentElement.classList.contains('dark');
        setDark(isDark);
    }, []);

    const toggle = () => {
        const newDark = !dark;
        setDark(newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDark);
    };

    if (!mounted) return <div className="w-8 h-8" />;

    return (
        <button
            onClick={toggle}
            className={cn(
                'w-8 h-8 flex items-center justify-center rounded-full',
                'border border-border/50 transition-all duration-300',
                'text-muted-foreground hover:text-primary hover:border-primary/40',
                'hover:bg-primary/5',
            )}
            aria-label="Toggle theme"
        >
            {dark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

const NAV_OFFSET = 60;

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const handleNavClick = (url: string) => {
        if (url === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (url.startsWith('/#')) {
            const id = url.slice(2);
            const el = document.getElementById(id);
            if (el) {
                const top =
                    el.getBoundingClientRect().top +
                    window.scrollY -
                    NAV_OFFSET;
                window.scrollTo({ top, behavior: 'smooth' });
                return;
            }
        }
        router.push(url);
    };

    return (
        <>
            {/* ── Top horizontal nav ── */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-[4] transition-all duration-300',
                    scrolled
                        ? 'bg-background/80 backdrop-blur-md border-b border-border/30'
                        : 'bg-transparent',
                )}
            >
                <div className="container flex items-center justify-between h-14">
                    {/* Theme toggle — top left */}
                    <ThemeToggle />

                    {/* Nav links — top right */}
                    <nav>
                        <ul className="flex items-center gap-6">
                            {MENU_LINKS.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleNavClick(link.url)}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-medium tracking-wide"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            {/* ── Fixed social icons — bottom right ── */}
            <div className="fixed bottom-8 right-6 z-[4] flex flex-col items-center gap-4">
                <a
                    href={GENERAL_INFO.githubProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label="GitHub"
                >
                    <GitHubIcon />
                </a>
                <a
                    href={GENERAL_INFO.linkedinProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    aria-label="LinkedIn"
                >
                    <LinkedInIcon />
                </a>
                <span className="w-px h-12 bg-muted-foreground/30 block" />
            </div>
        </>
    );
};

export default Navbar;
