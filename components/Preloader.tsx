'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // 1. Water fill rises from bottom to top inside the text
            tl.to('.fill-text', {
                clipPath: 'inset(0% 0 0 0)',
                duration: 1.5,
                ease: 'power2.inOut',
            });

            // 2. Brief hold — also waits for the rest of the page to load
            tl.to({}, { duration: 0.35 });

            // 3. Exit: panels slide down
            tl.to('.preloader-item', {
                y: '100%',
                duration: 0.45,
                stagger: 0.05,
                ease: 'power2.in',
            });

            // 4. Text and overlay fade out
            tl.to('.name-text', { autoAlpha: 0, duration: 0.25 }, '<0.15');
            tl.to(preloaderRef.current, { autoAlpha: 0, duration: 0.2 }, '<0.3');
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[200] flex" ref={preloaderRef}>
            {/* 10 background panels */}
            {[...Array(10)].map((_, i) => (
                <div key={i} className="preloader-item h-full w-[10%] bg-black" />
            ))}

            {/* BHARADWAJ — ghost outline + rising gradient fill */}
            <div className="name-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
                {/* Layer 1: Outline / ghost text — always visible */}
                <p
                    className="text-[17vw] lg:text-[165px] font-anton leading-none whitespace-nowrap"
                    style={{
                        WebkitTextStroke: '1.5px rgba(255,255,255,0.3)',
                        color: 'transparent',
                    }}
                >
                    BHARADWAJ
                </p>

                {/* Layer 2: Gradient fill text — clip rises from bottom (water fill) */}
                <p
                    className="fill-text absolute inset-0 text-[17vw] lg:text-[165px] font-anton leading-none whitespace-nowrap"
                    style={{
                        background:
                            'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        clipPath: 'inset(100% 0 0 0)', // starts fully hidden at top
                    }}
                >
                    BHARADWAJ
                </p>
            </div>
        </div>
    );
};

export default Preloader;
