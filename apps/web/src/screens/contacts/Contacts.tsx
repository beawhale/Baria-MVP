import { useState } from "react"
import { SearchBar } from "@ui"
import bigPlus from "@ui/assets/icons/big_plus.svg"

const contacts = [
  { id: "1", name: "Ava",   phone: "+44 7312 556 901", avatar: "https://i.pravatar.cc/48?img=1" },
  { id: "2", name: "Ben",   phone: "+1 917 234 5678",  avatar: "https://i.pravatar.cc/48?img=2" },
  { id: "3", name: "Chloé", phone: "+33 6 45 78 34 21",avatar: "https://i.pravatar.cc/48?img=3" },
  { id: "4", name: "Diego", phone: "+52 55 2345 6789", avatar: "https://i.pravatar.cc/48?img=4" },
  { id: "5", name: "Elena", phone: "+44 7123 456789",  avatar: "https://i.pravatar.cc/48?img=5" },
]

export default function Contacts() {
  const [q, setQ] = useState("")
  const items = contacts.filter(c => (c.name + " " + c.phone).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100 ">
      <header className="px-4 sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto w-full max-w-screen-lg pt-4 flex items-baseline justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <span className="text-sm text-blue-600">{items.length} Contacts</span>
        </div>
        <div className="mx-auto w-full max-w-screen-lg pb-3 pt-2 ">
          <SearchBar value={q} onChange={setQ} placeholder="Search contacts..." />
        </div>
      </header>

      <main className="mx-auto w-full max-w-screen-lg flex-1 px-0 md:px-4 md:pt-3">
        <div className="bg-white overflow-hidden">
          <ul>
            {items.map((x, i) => (
              <li key={x.id} className="px-4">
                {i === 0 && <div className="border-t border-[#92929233]" />}
                <div className="flex items-center gap-3 py-3">
                  <img src={x.avatar} className="h-11 w-11 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">{x.name}</p>
                    <p className="truncate text-sm text-slate-500">{x.phone}</p>
                  </div>
                  <button className="ml-auto rounded-full border border-slate-200 px-3 py-1 text-slate-600 text-sm">
                    Add
                  </button>
                </div>
                <div className="border-t border-[#92929233]" />
              </li>
            ))}
          </ul>
        </div>
      </main>

      <button className="fixed right-1 bottom-14">
        <img src={bigPlus} alt="New chat" />
      </button>
    </div>
  )
}
