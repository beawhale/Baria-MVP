import { useState } from "react"
import ChatListItem from "@ui/chat/ChatListItem"
import SearchBar from "@ui/chat/SearchBar"
import bigPlus from "@ui/assets/icons/big_plus.svg"

const data = [
  { id: "1", name: "Ava",   preview: "Hello there how is it going...", time: "4:23 PM", unread: 1, badges: ["EN"] },
  { id: "2", name: "Ben",   preview: "Hey! Hope you're great...",     time: "1:45 PM", unread: 0, badges: ["EN"] },
  { id: "3", name: "Chloé", preview: "Voice Message (0:20)",          time: "12:20 PM", unread: 2, badges: ["FR","EN"] },
  { id: "4", name: "Diego", preview: "Greetings! How have you been?", time: "11:30 AM", unread: 0, badges: ["ES","EN"] }
]

export default function Chats() {
  const [q, setQ] = useState("")
  const items = data.filter(x => (x.name + " " + x.preview).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      <header className="px-4 sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto w-full max-w-screen-lg  pt-4 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Chats</h1>
          <span className="text-sm text-blue-600">{items.length} Chats</span>
        </div>
        <div className="mx-auto w-full max-w-screen-lg pb-3 pt-2 ">
          <SearchBar value={q} onChange={setQ} />
        </div>
      </header>

<main className="mx-auto w-full max-w-screen-lg flex-1 px-0 md:px-4 md:pt-3">
  <div className="bg-white overflow-hidden">
    <ul>
      {items.map((x, i) => (
        <li key={x.id}>
          <ChatListItem
            {...x}
            isFirst={i === 0}
          />
        </li>
      ))}
    </ul>
  </div>
</main>
      <button className="fixed right-5 bottom-24">
        <img src={bigPlus} alt="New chat" />
      </button>
    </div>
  )
}
