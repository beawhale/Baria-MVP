import { Link, Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAuthed } from "@store/auth"
import { selectTheme, toggleTheme } from "@store/ui"
import { useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export default function Shell() {
    const authed = useSelector(selectIsAuthed)
    const theme = useSelector(selectTheme)
    const d = useDispatch()
    const { pathname } = useLocation()

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
    }, [theme])

    return (
        <div className="h-full grid grid-rows-[56px_1fr] bg-bg text-text">
            <header className="h-14 border-b border-border bg-panel flex items-center justify-between px-4">
                <div className="font-semibold">BARIA-MVP</div>

                <nav className="flex items-center gap-2">
                    <Link className={pathname === "/" ? "font-medium" : ""} to="/">Home</Link>
                    <Link to="/login">{authed ? "Account" : "Login"}</Link>

                    {/* Theme toggle */}
                    <button
                        onClick={() => d(toggleTheme())}
                        className="ml-3 h-9 w-9 rounded-full border border-border grid place-items-center hover:bg-[var(--bg-soft)]"
                        title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                </nav>
            </header>

            <main className="min-h-0"><Outlet /></main>
        </div>
    )
}
