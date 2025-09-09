import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        dedupe: ["react", "react-dom"],
        alias: {
            "@store": path.resolve(__dirname, "../../packages/store/src"),
            "@ui": path.resolve(__dirname, "../../packages/ui/src"),
            "@lib": path.resolve(__dirname, "../../packages/lib/src")
        }
    },
    server: { fs: { allow: ["..", "../../"] } },
    optimizeDeps: {
        include: [
            "react",
            "react-dom/client",
            "react-redux",
            "redux-persist/integration/react",
            "@reduxjs/toolkit",
            "localforage",
            "react-router-dom"
        ]
    }
});
