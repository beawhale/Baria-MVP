import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { markRead } from "@store/chat"
import MessageBubble from "@ui/chat/MessageBubble"
import chevronLeft from "@ui/assets/icons/chevron_left.svg"

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const d = useDispatch()

  useEffect(() => {
    if (id) d(markRead({ chatId: id }))
  }, [id, d])

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      <header className="sticky top-0 z-10 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-3 py-3">
          <Link to="/chats" className="rounded-full p-2">
            <img src={chevronLeft} alt="Back"  />
          </Link>
          <img src="https://i.pravatar.cc/40" className="h-9 w-9 rounded-full" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Chat {id}</p>
            <p className="truncate text-xs text-slate-500">
              Auto-translate to <button className="text-blue-600">English</button>
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 space-y-3 py-3">
        <div className="text-center text-xs text-slate-500">Today</div>
        <MessageBubble text="How are you today?" time="10:25 AM" />
        <MessageBubble mine text="Doing great, thanks!" time="10:27 AM" />
        <MessageBubble audio={{ duration: "0:05" }} time="11:45 AM" />
        <MessageBubble file={{ name: "Project_Plan.pdf", size: "345 kb" }} mine time="12:36 PM" />
        <MessageBubble text="Check this out." time="1:12 PM" />
      </main>
    </div>
  )
}
