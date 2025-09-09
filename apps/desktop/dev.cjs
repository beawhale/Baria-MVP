const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const electronBinary = require("electron");

const WEB_DIR = path.resolve(__dirname, "..", "web"); // apps/web
const DEV_URL = "http://localhost:5173";

function waitFor(url, timeoutMs = 60000) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        const attempt = () => {
            const req = http.get(url, res => {
                res.destroy();
                if (res.statusCode >= 200 && res.statusCode < 500) return resolve();
                if (Date.now() - start > timeoutMs) return reject(new Error("Timeout waiting for dev server"));
                setTimeout(attempt, 400);
            });
            req.on("error", () => {
                if (Date.now() - start > timeoutMs) return reject(new Error("Timeout waiting for dev server"));
                setTimeout(attempt, 400);
            });
        };
        attempt();
    });
}

// 1) Start Vite dev server (apps/web)
const webDev = spawn("pnpm", ["-C", WEB_DIR, "dev"], { shell: true, stdio: "inherit" });

// 2) Wait for dev server then start Electron
waitFor(DEV_URL)
    .then(() => {
        console.log("[desktop] Dev server is up:", DEV_URL);
        const child = spawn(electronBinary, ["."], {
            cwd: __dirname,
            shell: true,
            stdio: "inherit",
            env: { ...process.env, VITE_DEV_SERVER_URL: DEV_URL },
        });
        child.on("exit", (code) => {
            try { webDev.kill(); } catch { }
            process.exit(code ?? 0);
        });
    })
    .catch((err) => {
        console.error("[desktop] Failed to start Electron:", err.message);
        try { webDev.kill(); } catch { }
        process.exit(1);
    });

process.on("SIGINT", () => {
    try { webDev.kill(); } catch { }
    process.exit(0);
});
