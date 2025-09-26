import { Outlet, useLocation } from "react-router-dom"
import BottomTabs from "@ui/nav/BottomTabs"

export default function Shell() {
  const { pathname } = useLocation()
  const hideTabs = pathname.startsWith("/login")

  return (
    <div className="min-h-dvh bg-slate-100 flex flex-col">
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>

      {!hideTabs && (
        <footer className="sticky bottom-0">
          <BottomTabs />
        </footer>
      )}
    </div>
  )
}
