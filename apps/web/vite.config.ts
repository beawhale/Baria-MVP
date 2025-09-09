
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@store": path.resolve(__dirname, "../../packages/store/src"),
      "@lib": path.resolve(__dirname, "../../packages/lib/src")
    }
  },
  server: { host: true, port: 5173 }
})
