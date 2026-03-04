'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Product } from '@/data/products';

interface ProductTextOverlaysProps {
    product: Product;
}

export default function ProductTextOverlays({ product }: ProductTextOverlaysProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Calculate opacity sequences based on scroll progression (0 to 1 over 500vh)
    // Section 1: 0.05 -> 0.15 (peaks at 0.1)
    const opacity1 = useTransform(scrollYProgress, [0.0, 0.1, 0.2], [0, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.0, 0.1, 0.2], [50, 0, -50]);

    // Section 2: 0.25 -> 0.35 (peaks at 0.3)
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

    // Section 3: 0.55 -> 0.65 (peaks at 0.6)
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

    // Section 4: 0.75 -> 0.85 (peaks at 0.8)
    const opacity4 = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [50, 0, -50]);

    const TextBlock = ({
        opacity, y, title, subtitle, align
    }: {
        opacity: any, y: any, title: string, subtitle: string, align: 'left' | 'right'
    }) => (
        <motion.div
            style={{ opacity, y }}
            className={`absolute top-1/2 -translate-y-1/2 w-full px-8 md:px-24 pointer-events-none flex ${align === 'right' ? 'justify-end text-right' : 'justify-start text-left'}`}
        >
            <div className="max-w-2xl">
                <h2
                    className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4"
                    style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)', color: 'transparent' }}
                >
                    {title}
                </h2>
                <motion.p
                    className="text-xl md:text-3xl font-light tracking-[0.2em] uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    style={{ color: product.themeColor }}
                >
                    {subtitle}
                </motion.p>
            </div>
        </motion.div>
    );

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <TextBlock
                    opacity={opacity1} y={y1}
                    title={product.section1.title}
                    subtitle={product.section1.subtitle}
                    align="left"
                />
                <TextBlock
                    opacity={opacity2} y={y2}
                    title={product.section2.title}
                    subtitle={product.section2.subtitle}
                    align="right"
                />
                <TextBlock
                    opacity={opacity3} y={y3}
                    title={product.section3.title}
                    subtitle={product.section3.subtitle}
                    align="left"
                />
                <TextBlock
                    opacity={opacity4} y={y4}
                    title={product.section4.title}
                    subtitle={product.section4.subtitle}
                    align="right"
                />
            </div>
        </div>
    );
}
