import { Avatar } from "@ui"
import { Contact, Chat } from "@store/chat"

type Props = {
    contacts: Contact[]
    chats: Chat[]
    activeId?: string
    onSelect: (id: string) => void
}

export default function ContactsPane({ contacts, chats, activeId, onSelect }: Props) {
    return (
        <aside className="h-full flex flex-col bg-panel border-r border-border">
            <div className="h-14 flex items-center px-4 font-semibold">Contacts</div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {contacts.map((c: Contact) => {
                    const cChat = chats.find((x: Chat) => x.contactId === c.id)
                    const active = activeId === cChat?.id
                    return (
                        <button
                            key={c.id}
                            onClick={() => onSelect(cChat?.id || "")}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-colors
                ${active ? "bg-bubbleOut border-brand/40" : "bg-panel border-border hover:bg-[var(--bg-soft)]/60"}`}
                        >
                            <Avatar name={c.name} />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{c.name}</div>
                                <div className={`text-xs truncate ${c.online ? "text-brand" : "text-text-dim"}`}>
                                    {c.online ? "online" : c.handle}
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </aside>
    )
}
