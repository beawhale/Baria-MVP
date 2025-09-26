import { NavLink } from "react-router-dom"
import chatIcon from "../assets/icons/chat_bubble.svg"
import peopleIcon from "../assets/icons/people.svg"
import settingsIcon from "../assets/icons/settings.svg"

export default function BottomTabs() {
  const Item = (to: string, label: string, iconSrc: string) => (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        `flex flex-col items-center justify-center h-14 flex-1 text-xs ${
          isActive ? "text-blue-600" : "text-slate-500"
        }`
      }
    >
      <img src={iconSrc} alt="" className="h-5 w-5" />
      <span className="mt-0.5">{label}</span>
    </NavLink>
  )

  return (
    <nav className="w-full border-t bg-white">
      <div className="mx-auto grid max-w-md grid-cols-3">
        {Item("/chats", "Chats", chatIcon)}
        {Item("/contacts", "Contacts", peopleIcon)}
        {Item("/settings", "Settings", settingsIcon)}
      </div>
    </nav>
  )
}
