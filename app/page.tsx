'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentProduct = products[currentIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
        // Update global CSS variable for background gradient
        document.documentElement.style.setProperty('--product-gradient', currentProduct.gradient);
    }, [currentIndex, currentProduct]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <main className="relative min-h-screen selection:bg-bmw-neonGreen selection:text-black">
            <Navbar />

            {/* Fixed Navigation Elements */}
            <button
                onClick={handlePrev}
                className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all group hidden md:block"
            >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
                onClick={handleNext}
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all group hidden md:block"
            >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Bottom Trim Selection Pill */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
                <div className="flex p-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {products.map((p, idx) => (
                        <button
                            key={p.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${idx === currentIndex
                                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                    : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {p.subName}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentProduct.id}
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full"
                >
                    {/* Hero Scroll Engine + Text */}
                    <section className="relative w-full pb-32">
                        <ProductBottleScroll folderPath={currentProduct.folderPath} />
                        <ProductTextOverlays product={currentProduct} />

                        {/* Quick Stats Banner overlayed at the very bottom of scroll engine */}
                        <div className="absolute bottom-10 left-0 w-full z-20 px-6">
                            <div className="container mx-auto">
                                <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-4xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
                                    {currentProduct.stats.map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <p className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                            <p className="text-xl md:text-3xl font-light" style={{ color: currentProduct.themeColor }}>{stat.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Details Section */}
                    <section className="py-32 px-6 container mx-auto" id="design">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                        >
                            <div>
                                <h3 className="text-4xl md:text-6xl font-black uppercase mb-6">{currentProduct.detailsSection.title}</h3>
                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 font-light">
                                    {currentProduct.detailsSection.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {currentProduct.features.map((feature, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm tracking-wider uppercase">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                                {/* Fallback pattern if image is missing */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent z-10"></div>

                                {/* Simulated Image Box since user adds them manually */}
                                <div className="w-full h-full flex items-center justify-center bg-black/40 p-8 text-center relative z-20">
                                    <p className="text-white/30 uppercase tracking-widest text-sm border border-white/10 p-4 rounded-xl backdrop-blur-md">
                                        [ User Context: {currentProduct.detailsSection.imageAlt} ]
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Engineering Section */}
                    <section className="py-32 px-6 bg-black/40 border-y border-white/5" id="engineering">
                        <div className="container mx-auto max-w-5xl text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                            >
                                <h3 className="text-3xl md:text-5xl font-black uppercase mb-8" style={{ color: currentProduct.themeColor }}>
                                    {currentProduct.engineeringSection.title}
                                </h3>
                                <p className="text-white/70 text-xl md:text-3xl font-light leading-relaxed">
                                    {currentProduct.engineeringSection.description}
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Buy Now / Reserve Section */}
                    <section className="py-32 px-6 container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-3xl overflow-hidden border border-white/20 bg-black/60 backdrop-blur-xl p-8 md:p-16"
                        >
                            {/* Dynamic Glow Background */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000" style={{ backgroundColor: currentProduct.themeColor }}></div>

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-2">Own the {currentProduct.subName}</h2>
                                    <p className="text-white/50 text-xl mb-12">{currentProduct.buyNowSection.deliveryPromise}</p>

                                    <div className="space-y-6 mb-12">
                                        {currentProduct.buyNowSection.specs.map((spec, idx) => (
                                            <div key={idx} className="flex items-center gap-4">
                                                <CheckCircle2 className="w-6 h-6" style={{ color: currentProduct.themeColor }} />
                                                <span className="text-lg md:text-xl font-light">{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-16">
                                    <p className="text-white/50 uppercase tracking-widest text-sm mb-2">{currentProduct.buyNowSection.unit}</p>
                                    <p className="text-6xl md:text-8xl font-black tracking-tighter mb-8">{currentProduct.buyNowSection.price}</p>

                                    <button
                                        className="w-full lg:w-auto px-12 py-6 rounded-full text-black font-black uppercase tracking-widest text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl"
                                        style={{ backgroundColor: currentProduct.themeColor, boxShadow: `0 0 40px ${currentProduct.themeColor}80` }}
                                    >
                                        Reserve Allocation
                                    </button>
                                    <p className="text-white/30 text-xs mt-6 text-center lg:text-right w-full">{currentProduct.buyNowSection.warranty}</p>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Next Trim Transition Area */}
                    <section className="py-40 flex flex-col items-center justify-center text-center px-6">
                        <p className="text-white/50 uppercase tracking-[0.3em] text-sm mb-8">Next Model</p>
                        <button
                            onClick={handleNext}
                            className="text-5xl md:text-8xl font-black uppercase tracking-tighter hover:italic transition-all duration-500 group"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}
                        >
                            <span className="group-hover:text-white transition-colors duration-500">
                                {products[(currentIndex + 1) % products.length].subName}
                            </span>
                        </button>
                    </section>

                    <Footer />
                </motion.div>
            </AnimatePresence>
        </main>
    );
}
