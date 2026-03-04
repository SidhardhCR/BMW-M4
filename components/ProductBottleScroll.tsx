'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface ProductBottleScrollProps {
    folderPath: string;
}

const TOTAL_FRAMES = 192;

export default function ProductBottleScroll({ folderPath }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${folderPath}/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [folderPath]);

    // Handle Resize and Drawing
    useEffect(() => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Responsive Canvas Setup
        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            // Match canvas internal resolution to display size for sharpness
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }

            // Calculate object-fit: contain logic
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.min(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        };

        // Initial render
        renderFrame(0);

        // Initial Resize handling
        const handleResize = () => renderFrame(Math.floor(scrollYProgress.get() * (TOTAL_FRAMES - 1)));
        window.addEventListener('resize', handleResize);

        // Scroll mapping
        const unsubscribe = scrollYProgress.onChange((latest) => {
            const frameIndex = Math.floor(latest * (TOTAL_FRAMES - 1));
            requestAnimationFrame(() => renderFrame(frameIndex));
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [loaded, images, scrollYProgress]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-transparent">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-bmw-neonGreen rounded-full animate-spin" />
                            <p className="font-bold tracking-widest uppercase text-sm animate-pulse">Initializing Engine...</p>
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease' }}
                />
            </div>
        </div>
    );
}
