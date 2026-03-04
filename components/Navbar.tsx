'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <svg className="w-8 h-8 text-white group-hover:text-bmw-neonGreen transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                    </svg>
                    <span className="font-bold text-xl tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-bmw-neonGreen to-bmw-neonCyan">
                        BMW M4
                    </span>
                </Link>

                <div className="hidden md:flex gap-8 text-sm font-medium tracking-wider uppercase text-white/70">
                    <Link href="#models" className="hover:text-white transition-colors">Models</Link>
                    <Link href="#engineering" className="hover:text-white transition-colors">Engineering</Link>
                    <Link href="#design" className="hover:text-white transition-colors">Design</Link>
                </div>

                <button className="relative overflow-hidden group px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(57,255,20,0)] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                    <span className="relative z-10 text-sm font-bold tracking-wider uppercase">Reserve Now</span>
                </button>
            </div>
        </motion.nav>
    );
}
