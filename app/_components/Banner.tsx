'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROLES = [
    'Business Intelligence',
    'Data Engineering',
    'Product Analytics',
    'Business Analysis',
];

const AnimatedRole = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % ROLES.length);
                setVisible(true);
            }, 350);
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className="text-primary font-bold inline-block transition-all duration-300"
            style={{
                fontFamily: 'var(--font-roboto-flex)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
            }}
        >
            {ROLES[index]}
        </span>
    );
};

const ProfilePhoto = () => {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-[3px] flex-shrink-0"
            style={{
                background:
                    'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
            }}
        >
            <div className="w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center">
                {!imgError ? (
                    <Image
                        src="/profile.jpg"
                        alt="Shamanth G Bharadwaj"
                        width={384}
                        height={384}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                        priority
                    />
                ) : (
                    <span
                        className="font-anton text-5xl tracking-wider"
                        style={{
                            background:
                                'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        SGB
                    </span>
                )}
            </div>
        </div>
    );
};

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[560px] flex items-center"
                ref={containerRef}
            >
                {/* Two-column grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 items-start">

                    {/* ── LEFT COLUMN — name, roles, bio, CTA ── */}
                    <div className="flex flex-col gap-6 slide-up-and-fade">
                        <div>
                            <p className="text-lg text-muted-foreground mb-2">
                                Hi, I&apos;m
                            </p>
                            <h1 className="font-anton leading-[.9] text-[clamp(3.2rem,7vw,6rem)]">
                                <span className="text-primary block">SHAMANTH</span>
                                <span className="block ml-1">BHARADWAJ</span>
                            </h1>
                            <p className="text-xl md:text-2xl mt-4 font-light text-muted-foreground">
                                <AnimatedRole />
                            </p>
                        </div>

                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[420px]">
                            BI &amp; Data Engineer with 4+ years of experience
                            turning raw data into trusted pipelines, legible
                            dashboards, and decisions that matter. Currently at{' '}
                            <span className="text-foreground font-medium">
                                Keelvar
                            </span>
                            , Cork.
                        </p>

                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={GENERAL_INFO.linkedinProfile}
                            variant="primary"
                            className="w-fit"
                        >
                            Connect on LinkedIn
                        </Button>
                    </div>

                    {/* ── RIGHT COLUMN — photo top-anchored, then stats below ── */}
                    <div className="slide-up-and-fade flex flex-col items-center gap-10 justify-start pt-8 relative z-10">

                        {/* Profile photo */}
                        <ProfilePhoto />

                        {/* Stats below the photo */}
                        <div className="flex gap-14 md:gap-16 text-center">
                            <div>
                                <h5 className="text-5xl md:text-6xl font-anton text-primary leading-none mb-2">
                                    4+
                                </h5>
                                <p className="text-muted-foreground text-sm leading-snug">
                                    Years of
                                    <br />
                                    Experience
                                </p>
                            </div>
                            <div>
                                <h5 className="text-5xl md:text-6xl font-anton text-primary leading-none mb-2">
                                    2×
                                </h5>
                                <p className="text-muted-foreground text-sm leading-snug">
                                    GEM Award
                                    <br />
                                    Winner
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;
