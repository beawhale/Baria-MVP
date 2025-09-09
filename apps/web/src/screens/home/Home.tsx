import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    selectChats,
    selectMessagesByActive,
    selectActiveChatId,
    setActive,
    seedDemo,
    selectContacts,
    markRead,
} from "@store/chat"
import ContactsPane from "@ui/primitives/ContactsPane"
import ChatPane from "@ui/primitives/ChatPane"

export default function Home() {
    const d = useDispatch()
    const chats = useSelector(selectChats)
    const contacts = useSelector(selectContacts)
    const activeId = useSelector(selectActiveChatId)
    const msgs = useSelector(selectMessagesByActive)

    const [text, setText] = useState("")
    const [translate, setTranslate] = useState(false)
    const [recording, setRecording] = useState(false)

    // seed demo + mark read
    useEffect(() => { d(seedDemo()) }, [d])
    useEffect(() => { if (activeId) d(markRead({ chatId: activeId })) }, [activeId, d])

    const visibleMsgs = useMemo(
        () => msgs.filter(m => m.kind === "voice" || (m.kind === "text" && m.text?.trim())),
        [msgs]
    )

    // auto-scroll
    const bottomRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [visibleMsgs.length])

    // active contact
    const activeContact = useMemo(() => {
        const chat = chats.find(c => c.id === activeId)
        return contacts.find(c => c.id === chat?.contactId)
    }, [activeId, chats, contacts])

    const isChatOpen = Boolean(activeId)

    return (
        <div className="h-full bg-bg text-text">
            {/* Web / Tablet (>= md): contacts always visible */}
            <div className="hidden md:flex h-full">
                <div className="w-[240px] lg:w-[280px] shrink-0 border-r border-border">
                    <ContactsPane
                        contacts={contacts}
                        chats={chats}
                        activeId={activeId}
                        onSelect={(id: string) => d(setActive(id))}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <ChatPane
                        activeContact={activeContact}
                        msgs={visibleMsgs}
                        text={text}
                        setText={setText}
                        translate={translate}
                        setTranslate={setTranslate}
                        recording={recording}
                        setRecording={setRecording}
                        bottomRef={bottomRef}
                        d={d}
                        activeId={activeId}
                    />
                </div>
            </div>

            {/* Mobile (< md): single pane (contacts OR chat) */}
            <div className="block md:hidden h-full">
                {!isChatOpen ? (
                    <ContactsPane
                        contacts={contacts}
                        chats={chats}
                        activeId={activeId}
                        onSelect={(id: string) => d(setActive(id))}
                    />
                ) : (
                    <ChatPane
                        activeContact={activeContact}
                        msgs={visibleMsgs}
                        text={text}
                        setText={setText}
                        translate={translate}
                        setTranslate={setTranslate}
                        recording={recording}
                        setRecording={setRecording}
                        bottomRef={bottomRef}
                        d={d}
                        activeId={activeId}
                        onBack={() => d(setActive(""))} // back to contacts on mobile
                    />
                )}
            </div>
        </div>
    )
}
