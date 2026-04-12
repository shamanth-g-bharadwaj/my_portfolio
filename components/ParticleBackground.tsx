'use client';
import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    pulse: number;
    pulseSpeed: number;
}

const NetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const NODE_COUNT = 42;
        const MAX_DIST = 155;
        const nodes: Node[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                radius: Math.random() * 1.2 + 0.6,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.014 + 0.006,
            });
        }

        let animId: number;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.classList.contains('dark');

            // Node colour: blue, tuned per theme
            const nr = isDark ? 99  : 30;
            const ng = isDark ? 162 : 90;
            const nb = isDark ? 237 : 220;

            // ── Hex grid — very faint geometric texture ─────────────────
            const hexSize = 56;
            const hexW = hexSize * 2;
            const hexH = Math.sqrt(3) * hexSize;
            ctx.strokeStyle = isDark
                ? `rgba(${nr},${ng},${nb},0.04)`
                : `rgba(${nr},${ng},${nb},0.06)`;
            ctx.lineWidth = 0.5;
            const cols = Math.ceil(canvas.width  / hexW) + 2;
            const rows = Math.ceil(canvas.height / hexH) + 2;
            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    const cx = col * hexW + (row % 2 === 0 ? 0 : hexSize);
                    const cy = row * hexH;
                    ctx.beginPath();
                    for (let side = 0; side < 6; side++) {
                        const angle = (Math.PI / 180) * (60 * side - 30);
                        const px = cx + hexSize * Math.cos(angle);
                        const py = cy + hexSize * Math.sin(angle);
                        if (side === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // ── Move nodes ───────────────────────────────────────────────
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                node.pulse += node.pulseSpeed;
                if (node.x < 0 || node.x > canvas.width)  node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height)  node.vy *= -1;
                node.x = Math.max(0, Math.min(canvas.width,  node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));
            });

            // ── Draw connections ─────────────────────────────────────────
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        const alpha = (1 - dist / MAX_DIST) * (isDark ? 0.18 : 0.1);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${nr},${ng},${nb},${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // ── Draw nodes ───────────────────────────────────────────────
            nodes.forEach(node => {
                const pr = node.radius + Math.sin(node.pulse) * 0.4;
                const nodeAlpha = isDark
                    ? 0.35 + Math.abs(Math.sin(node.pulse)) * 0.25
                    : 0.2  + Math.abs(Math.sin(node.pulse)) * 0.12;

                ctx.beginPath();
                ctx.arc(node.x, node.y, pr, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${nr},${ng},${nb},${nodeAlpha})`;
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
