'use client';
import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
    alphaDir: number;
    alphaSpeed: number;
}

const NetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const NODE_COUNT = 55;
        const MAX_DIST = 150;
        const nodes: Node[] = [];

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < NODE_COUNT; i++) {
            const startAlpha = Math.random();
            nodes.push({
                x:          Math.random() * window.innerWidth,
                y:          Math.random() * window.innerHeight,
                vx:         (Math.random() - 0.5) * 0.25,
                vy:         (Math.random() - 0.5) * 0.25,
                radius:     Math.random() * 1.4 + 0.6,
                alpha:      startAlpha,
                alphaDir:   Math.random() > 0.5 ? 1 : -1,
                alphaSpeed: Math.random() * 0.006 + 0.002,
            });
        }

        let animId: number;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.classList.contains('dark');

            // Dot colour: white on dark, dark charcoal on light
            const [r, g, b] = isDark ? [255, 255, 255] : [45, 45, 55];

            // Alpha ranges:  dark → full twinkle 0.08–0.75 | light → subtle 0.04–0.22
            const [minA, maxA] = isDark ? [0.08, 0.75] : [0.04, 0.22];

            // ── Hex grid ────────────────────────────────────────────────
            const hexSize = 56;
            const hexW = hexSize * 2;
            const hexH = Math.sqrt(3) * hexSize;
            ctx.strokeStyle = isDark
                ? `rgba(255,255,255,0.04)`
                : `rgba(45,45,55,0.05)`;
            ctx.lineWidth = 0.5;
            const cols = Math.ceil(canvas.width  / hexW) + 2;
            const rows = Math.ceil(canvas.height / hexH) + 2;
            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const cx = col * hexW + (row % 2 === 0 ? 0 : hexSize);
                    const cy = row * hexH;
                    ctx.beginPath();
                    for (let s = 0; s < 6; s++) {
                        const angle = (Math.PI / 180) * (60 * s - 30);
                        const px = cx + hexSize * Math.cos(angle);
                        const py = cy + hexSize * Math.sin(angle);
                        if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // ── Move + twinkle nodes ────────────────────────────────────
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Twinkle
                node.alpha += node.alphaDir * node.alphaSpeed;
                if (node.alpha > maxA) { node.alpha = maxA; node.alphaDir = -1; }
                if (node.alpha < minA) { node.alpha = minA; node.alphaDir =  1; }

                // Bounce
                if (node.x < 0 || node.x > canvas.width)  node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height)  node.vy *= -1;
                node.x = Math.max(0, Math.min(canvas.width,  node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));
            });

            // ── Connections ─────────────────────────────────────────────
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx   = nodes[i].x - nodes[j].x;
                    const dy   = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        const lineAlpha = (1 - dist / MAX_DIST)
                            * (isDark ? 0.14 : 0.07)
                            * ((nodes[i].alpha + nodes[j].alpha) / (maxA * 2));
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // ── Dots ─────────────────────────────────────────────────────
            nodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${node.alpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default NetworkBackground;
