'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

interface ProductBottleScrollProps {
    folderPath: string;
}

const TOTAL_FRAMES = 192;

export default function ProductBottleScroll({ folderPath }: ProductBottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [experienceStarted, setExperienceStarted] = useState(false);

    /* =========================
       PRELOAD IMAGES
    ========================== */
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${folderPath}/ezgif-frame-${i
                .toString()
                .padStart(3, '0')}.jpg`;

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

    /* =========================
       HANDLE START ENGINE CLICK
    ========================== */
    const handleStartExperience = async () => {
        if (!audioRef.current) return;

        try {
            // Unlock audio context safely on user interaction
            await audioRef.current.play();
            audioRef.current.pause(); // Immediately pause after unlocking
            audioRef.current.volume = 0.4;
            setExperienceStarted(true);

            // Enable scroll again
            document.body.style.overflow = 'auto';
        } catch (err) {
            console.warn('Audio start failed:', err);
        }
    };

    /* =========================
       LOCK SCROLL INITIALLY
    ========================== */
    useEffect(() => {
        document.body.style.overflow = experienceStarted ? 'auto' : 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [experienceStarted]);

    /* =========================
       CANVAS RENDER + SCROLL
    ========================== */
    useEffect(() => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const renderFrame = (index: number) => {
            const img = images[index];
            if (!img) return;

            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        };

        renderFrame(0);

        const handleResize = () => {
            const frameIndex = Math.floor(
                scrollYProgress.get() * (TOTAL_FRAMES - 1)
            );
            renderFrame(frameIndex);
        };

        window.addEventListener('resize', handleResize);

        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (!experienceStarted) return;

            const frameIndex = Math.floor(latest * (TOTAL_FRAMES - 1));
            requestAnimationFrame(() => renderFrame(frameIndex));

            if (audioRef.current) {
                if (audioRef.current.paused) {
                    audioRef.current.play().catch(() => { });
                }

                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }

                scrollTimeout.current = setTimeout(() => {
                    audioRef.current?.pause();
                }, 150);
            }
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [loaded, images, scrollYProgress, experienceStarted]);

    return (
        <>
            {/* ===== INTRO OVERLAY ===== */}
            {!experienceStarted && (
                <div className="absolute top-0 left-0 w-full h-screen z-[9999] flex items-center justify-center bg-black text-white">
                    <div className="text-center space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-widest uppercase">
                            BMW M4 Experience
                        </h1>

                        <button
                            onClick={handleStartExperience}
                            disabled={!loaded}
                            className="px-10 py-4 border-2 border-white rounded-full tracking-widest uppercase text-sm
                   hover:bg-white hover:text-black transition-all duration-500
                   disabled:opacity-40"
                        >
                            {loaded ? 'Start Engine' : 'Loading...'}
                        </button>
                    </div>
                </div>
            )}

            {/* ===== SCROLL SECTION ===== */}
            <div
                ref={containerRef}
                className="relative h-[500vh] w-full bg-transparent"
            >
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    {!loaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-green-400 rounded-full animate-spin" />
                                <p className="font-bold tracking-widest uppercase text-sm animate-pulse text-white">
                                    Initializing Engine...
                                </p>
                            </div>
                        </div>
                    )}

                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        style={{
                            opacity: loaded ? 1 : 0,
                            transition: 'opacity 1s ease',
                        }}
                    />

                    <audio
                        ref={audioRef}
                        src="/sounds/bmw-m4.mp3"
                        loop
                        preload="auto"
                    />
                </div>
            </div>
        </>
    );
}