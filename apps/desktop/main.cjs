const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

const isDev = !!process.env.VITE_DEV_SERVER_URL; 
let win = null;

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        backgroundColor: "#0f1116",
        title: "BARIA-MVP",
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            devTools: true,
        },
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });

    if (isDev) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        const indexPath = path.resolve(__dirname, "web-dist", "index.html");
        win.loadFile(indexPath);
    }

    win.on("closed", () => (win = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (win === null) createWindow(); });
