import type { Config } from "tailwindcss"
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: "var(--brand)",
                brand600: "var(--brand-600)",
                bg: "var(--bg)",
                bgsoft: "var(--bg-soft)",
                panel: "var(--panel)",
                border: "var(--border)",
                text: "var(--text)",
                textdim: "var(--text-dim)",
                bubbleOut: "var(--bubble-out)",
                bubbleIn: "var(--bubble-in)",
                ok: "var(--ok)",
                warn: "var(--warn)",
                accent: "var(--accent)"
            },
            borderRadius: { xl: "var(--r-xl)", "2xl": "var(--r-2xl)" },
            boxShadow: { soft: "var(--shadow-soft)" }
        }
    },
    plugins: []
} satisfies Config
