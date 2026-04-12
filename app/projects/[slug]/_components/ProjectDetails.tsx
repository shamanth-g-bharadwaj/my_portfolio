'use client';
import parse from 'html-react-parser';
import ArrowAnimation from '@/components/ArrowAnimation';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.5,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                // position: 'sticky',
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    // scroll-reveal for each project image
    useGSAP(
        () => {
            gsap.utils
                .toArray<HTMLElement>('.project-image')
                .forEach((el) => {
                    gsap.fromTo(
                        el,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 88%',
                            },
                        },
                    );
                });
        },
        { scope: containerRef },
    );

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-16 w-fit flex gap-2.5 items-center group px-4 py-2.5 rounded-md border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200 flex-shrink-0" />
                    <span className="text-sm font-medium">Back</span>
                </TransitionLink>

                <div
                    className="top-0 min-h-[calc(100svh-100px)] flex"
                    id="info"
                >
                    <div className="relative w-full">
                        <div className="flex items-start gap-6 mx-auto mb-10 max-w-[635px]">
                            <h1 className="fade-in-later opacity-0 text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
                                <span className="inline-block">
                                    {project.title}
                                </span>
                            </h1>

                            <div className="fade-in-later opacity-0 flex gap-2">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="hover:text-primary"
                                    >
                                        <Github size={30} />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="hover:text-primary"
                                    >
                                        <ExternalLink size={30} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="max-w-[635px] space-y-7 pb-20 mx-auto">
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Year
                                </p>

                                <div className="text-lg">{project.year}</div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Tech & Technique
                                </p>

                                <div className="text-lg">
                                    {project.techStack.join(', ')}
                                </div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Description
                                </p>

                                <div className="text-lg prose-xl markdown-text">
                                    {parse(project.description)}
                                </div>
                            </div>
                            {project.role && (
                                <div className="fade-in-later">
                                    <p className="text-muted-foreground font-anton mb-3">
                                        My Role
                                    </p>

                                    <div className="text-lg">
                                        {parse(project.role)}
                                    </div>
                                </div>
                            )}
                        </div>

                        <ArrowAnimation />
                    </div>
                </div>

                {(project.images ?? []).length > 0 && (
                    <div
                        className="relative flex flex-col gap-6 max-w-[800px] mx-auto mt-8"
                        id="images"
                    >
                        {(project.images ?? []).map((image, idx) => (
                            <div
                                key={image}
                                className="project-image group relative w-full overflow-hidden"
                            >
                                <Image
                                    src={image}
                                    alt={`${project.title} — screenshot ${idx + 1}`}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto"
                                    priority={idx === 0}
                                />
                                <a
                                    href={image}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute top-4 right-4 bg-background/70 text-foreground size-12 inline-flex justify-center items-center transition-all opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
                                >
                                    <ExternalLink />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectDetails;
