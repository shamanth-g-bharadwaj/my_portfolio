'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EDUCATION } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Education = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.education-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="education">
            <div className="container" ref={containerRef}>
                <SectionTitle title="Education" />

                <div className="grid gap-14">
                    {MY_EDUCATION.map((item) => (
                        <div key={item.degree} className="education-item">
                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                <p className="text-2xl md:text-3xl text-muted-foreground font-semibold">
                                    {item.institution}
                                </p>
                                <span className="text-xs px-2.5 py-1 rounded-full border border-primary/40 text-primary font-semibold tracking-wide">
                                    {item.grade}
                                </span>
                            </div>
                            <p className="text-6xl md:text-7xl font-anton leading-none mt-4 mb-3">
                                {item.degree}
                            </p>
                            <p className="text-xl text-muted-foreground">
                                {item.duration}
                            </p>
                            <p className="text-base text-muted-foreground mt-1 opacity-60">
                                {item.location}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
