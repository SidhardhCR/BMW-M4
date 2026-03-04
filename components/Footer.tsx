import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-20 border-t border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bmw-neonGreen to-transparent opacity-50"></div>

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <svg className="w-8 h-8 text-bmw-neonGreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-bold text-xl tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-bmw-neonGreen to-bmw-neonCyan">
                            BMW M4
                        </span>
                    </div>
                    <p className="text-white/50 text-sm max-w-sm mb-8 leading-relaxed">
                        The ultimate driving machine reimagined. Merging track-focused performance with futuristic aesthetics for a new era of automotive excellence.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Models</h4>
                    <ul className="space-y-4 text-sm text-white/50">
                        <li><Link href="#" className="hover:text-bmw-compGreen transition-colors">M4 Competition</Link></li>
                        <li><Link href="#" className="hover:text-bmw-neonCyan transition-colors">M4 CSL</Link></li>
                        <li><Link href="#" className="hover:text-bmw-neonGreen transition-colors">Neon Concept</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Engineering</h4>
                    <ul className="space-y-4 text-sm text-white/50">
                        <li><Link href="#" className="hover:text-white transition-colors">Powertrain</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Aerodynamics</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Lightweighting</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Technology</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Newsletter</h4>
                    <p className="text-xs text-white/50 mb-4">Stay updated on the latest performance models and concept reveals.</p>
                    <div className="flex bg-white/5 rounded-full border border-white/10 overflow-hidden focus-within:border-bmw-neonGreen focus-within:ring-1 focus-within:ring-bmw-neonGreen transition-all">
                        <input type="email" placeholder="Email Address" className="bg-transparent text-sm px-4 py-3 outline-none w-full placeholder:text-white/30" />
                        <button className="px-4 text-bmw-neonGreen font-bold hover:bg-white/10 transition-colors uppercase text-xs tracking-wider">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
                <p>&copy; {new Date().getFullYear()} BMW AG. Concept Project.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-white transition-colors">Legal</Link>
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                </div>
            </div>
        </footer>
    );
}
