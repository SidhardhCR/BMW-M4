export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: { title: string; description: string; imageAlt: string };
    engineeringSection: { title: string; description: string };
    buyNowSection: {
        price: string;
        unit: string;
        specs: string[];
        deliveryPromise: string;
        warranty: string;
    };
}

export const products: Product[] = [
    {
        id: "competition",
        name: "BMW M4",
        subName: "Competition",
        price: "$82,200",
        description: "The benchmark for high-performance coupes, blending track capability with daily drivability.",
        folderPath: "/images",
        themeColor: "#00FF66",
        gradient: "linear-gradient(135deg, #001F0F 0%, #00FF66 100%)",
        features: ["M xDrive", "Competition Package", "Carbon Fiber Trim"],
        stats: [
            { label: "0–100 km/h", val: "3.5s" },
            { label: "Power", val: "510 HP" },
            { label: "Torque", val: "650 Nm" }
        ],
        section1: { title: "AGGRESSIVE.", subtitle: "A PRESENCE THAT DEMANDS ATTENTION." },
        section2: { title: "TRACK-FOCUSED.", subtitle: "BORN ON THE NÜRBURGRING." },
        section3: { title: "PRECISION-ENGINEERED.", subtitle: "EVERY COMPONENT OPTIMIZED." },
        section4: { title: "COMPETITION.", subtitle: "THE ULTIMATE DRIVING MACHINE." },
        detailsSection: {
            title: "Design Philosophy",
            description: "The M4 Competition brings aggressive styling and unmatched road presence. Its widened stance and signature kidney grille make an unmistakable statement.",
            imageAlt: "BMW M4 Competition Front View"
        },
        engineeringSection: {
            title: "M TwinPower Turbo",
            description: "The 3.0-liter inline 6-cylinder engine delivers explosive power, paired perfectly with the 8-speed M Steptronic transmission."
        },
        buyNowSection: {
            price: "$82,200",
            unit: "Starting MSRP",
            specs: ["510 HP Inline-6", "M xDrive All-Wheel Drive", "M Sport Differential"],
            deliveryPromise: "Build your allocation today.",
            warranty: "4-Year/50,000-Mile Limited Warranty"
        }
    },
    {
        id: "csl",
        name: "BMW M4",
        subName: "CSL",
        price: "$139,900",
        description: "Coupe Sport Lightweight. The most hardcore, track-dominating M4 ever created.",
        folderPath: "/images",
        themeColor: "#00E5FF",
        gradient: "linear-gradient(135deg, #00111A 0%, #00E5FF 100%)",
        features: ["Carbon Fiber Roof", "Titanium Exhaust", "Laserlight"],
        stats: [
            { label: "0–100 km/h", val: "3.7s" },
            { label: "Power", val: "543 HP" },
            { label: "Weight Reduction", val: "-100 kg" }
        ],
        section1: { title: "LIGHTWEIGHT.", subtitle: "EVERY GRAM MATTERS." },
        section2: { title: "CARBON OBSESSION.", subtitle: "BUILT FOR THE APEX." },
        section3: { title: "TRACK DOMINANCE.", subtitle: "NO COMPROMISES ALLOWED." },
        section4: { title: "C S L.", subtitle: "LIMITED TO 1,000 UNITS WORLDWIDE." },
        detailsSection: {
            title: "Radical Diet",
            description: "Extensive use of Carbon Fiber Reinforced Plastic (CFRP) and a rear-seat delete resulting in a massive 100kg weight reduction compared to the M4 Competition.",
            imageAlt: "BMW M4 CSL Details"
        },
        engineeringSection: {
            title: "Untamed Performance",
            description: "Boost pressure increased from 1.7 to 2.1 bar. Upgraded cooling and oil supply systems ensure peak performance on the track."
        },
        buyNowSection: {
            price: "$139,900",
            unit: "Starting MSRP",
            specs: ["543 HP Inline-6", "Rear-Wheel Drive", "Carbon Ceramic Brakes"],
            deliveryPromise: "Strictly limited availability. Contact your dealer.",
            warranty: "4-Year/50,000-Mile Limited Warranty"
        }
    },
    {
        id: "neon",
        name: "BMW M4",
        subName: "NEON CONCEPT",
        price: "Concept",
        description: "A visionary take on automotive design, merging mecha-aesthetics with electric performance concepts.",
        folderPath: "/images",
        themeColor: "#39FF14",
        gradient: "linear-gradient(135deg, #000000 0%, #39FF14 100%)",
        features: ["Cybernetic UI", "Active Aero", "Neon Accent Matrix"],
        stats: [
            { label: "0–100 km/h", val: "Unknown" },
            { label: "Power", val: "Classified" },
            { label: "Torque", val: "Immediate" }
        ],
        section1: { title: "FUTURISTIC.", subtitle: "THE NEXT EVOLUTION." },
        section2: { title: "EXPERIMENTAL.", subtitle: "PUSHING BEYOND LIMITS." },
        section3: { title: "MECHA-INSPIRED.", subtitle: "MACHINE FLUIDITY." },
        section4: { title: "NEON.", subtitle: "WELCOME TO THE GRID." },
        detailsSection: {
            title: "Cybernetic Design",
            description: "The Neon Concept replaces traditional lighting with dynamic, programmable neon matrices that respond to the environment and driver inputs.",
            imageAlt: "BMW M4 Neon Concept Render"
        },
        engineeringSection: {
            title: "Next-Gen Powertrain Concept",
            description: "Exploring the boundaries of solid-state battery technology combined with ultra-high-RPM motors for a surreal driving experience."
        },
        buyNowSection: {
            price: "Concept",
            unit: "Not for sale",
            specs: ["Experimental Powertrain", "Adaptive Metamaterials", "Neural-Link Steering"],
            deliveryPromise: "Coming to a future near you.",
            warranty: "Visionary Project"
        }
    }
];
