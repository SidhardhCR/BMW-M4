import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                bmw: {
                    neonGreen: "#39FF14",
                    neonCyan: "#00E5FF",
                    compGreen: "#00FF66",
                },
            },
            backgroundImage: {
                "product-gradient": "var(--product-gradient, linear-gradient(135deg, #001F0F 0%, #00FF66 100%))",
            },
        },
    },
    plugins: [],
};

export default config;
