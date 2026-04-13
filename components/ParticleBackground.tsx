'use client';
import { useEffect, useRef } from 'react';

const hsl2rgb = (h: number, s: number, l: number): [number, number, number] => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if      (h < 60)  { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else              { r = c; g = 0; b = x; }
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

const WaveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0, H = 0;
        const resize = () => {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const EYE_H      = 130;
        const FOCAL      = 320;
        const ROW_COUNT  = 20;
        const COL_SPACING = 35;  // wider spacing — less crowding near viewer
        const WAVE_KZ    = 0.009;
        const WAVE_KX    = 0.003;
        const WAVE_OMEGA = 0.52;
        const SCREEN_AMP = 35;   // more wave

        let animId: number;

        const draw = (ts: number) => {
            const time = ts * 0.001 * WAVE_OMEGA;
            ctx.clearRect(0, 0, W, H);

            const isDark    = document.documentElement.classList.contains('dark');
            const HORIZON_Y = H * 0.50;

            // ── Hex grid ──────────────────────────────────────────────────
            const hexSize = 56;
            const hexW    = hexSize * 2;
            const hexH    = Math.sqrt(3) * hexSize;
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(40,40,60,0.08)';
            ctx.lineWidth   = 0.5;
            const hCols = Math.ceil(W / hexW) + 2;
            const hRows = Math.ceil(H / hexH) + 2;
            for (let hr = -1; hr < hRows; hr++) {
                for (let hc = -1; hc < hCols; hc++) {
                    const cx = hc * hexW + (hr % 2 === 0 ? 0 : hexSize);
                    const cy = hr * hexH;
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

            // Dark:  bottom = white,       top = electric blue
            // Light: bottom = teal accent, top = dark foreground
            // → colours invert roles between themes so both halves always pop
            const bottomRGB: [number, number, number] = isDark
                ? [255, 255, 255]
                : hsl2rgb(171, 0.65, 0.36);
            const topRGB: [number, number, number] = isDark
                ? hsl2rgb(217, 1.0, 0.63)
                : [40, 40, 60];

            for (let row = 0; row < ROW_COUNT; row++) {
                const t = row / ROW_COUNT;

                // Bottom row base y
                const bottomY = H - Math.pow(t, 1.6) * (H - HORIZON_Y - 12);
                const dy      = bottomY - HORIZON_Y;
                if (dy <= 2) continue;

                const worldZ     = (EYE_H * FOCAL) / dy;
                const perspScale = FOCAL / worldZ;
                const halfCols   = Math.ceil((W * 0.72) / (COL_SPACING * perspScale)) + 1;
                const depthFade  = 1 - t;
                const rowAmp     = SCREEN_AMP * Math.sqrt(depthFade);

                for (let col = -halfCols; col <= halfCols; col++) {
                    const worldX = col * COL_SPACING;
                    const sx     = W * 0.5 + worldX * perspScale;
                    if (sx < -10 || sx > W + 10) continue;

                    const phase = worldZ * WAVE_KZ - worldX * WAVE_KX + time;
                    const wave  = (Math.sin(phase) + Math.sin(phase * 1.55 + 2.1) * 0.38) / 1.38;
                    const crest = (wave + 1) * 0.5;
                    const radius = Math.max(0.4, Math.min(perspScale * 4, 1.4));

                    // ── Bottom half — foreground colour ───────────────────
                    const syBottom = bottomY + wave * rowAmp;
                    if (syBottom >= HORIZON_Y && syBottom <= H + 6) {
                        const [r, g, b] = bottomRGB;
                        const alpha = depthFade * (0.18 + crest * 0.55);
                        ctx.beginPath();
                        ctx.arc(sx, syBottom, radius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                        ctx.fill();
                    }

                    // ── Top half — exact mirror, accent colour ────────────
                    const syTop = HORIZON_Y - (syBottom - HORIZON_Y);
                    if (syTop >= -6 && syTop <= HORIZON_Y) {
                        const [r, g, b] = topRGB;
                        const alpha = depthFade * (0.15 + crest * 0.45);
                        ctx.beginPath();
                        ctx.arc(sx, syTop, radius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                        ctx.fill();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);

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

export default WaveBackground;
