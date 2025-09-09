import React from "react"
import { Button, Input, Avatar, WaveformBar, Badge } from "@ui"
import { Check, CheckCheck, Mic, Paperclip, Send, SmilePlus } from "lucide-react"
import { AppDispatch } from "@store/store"
import { Contact, setTyping, sendText, sendVoice } from "@store/chat"

type ChatMessage = {
    id: string
    chatId: string
    from: "me" | "them"
    ts: number
    kind: "text" | "voice"
    text?: string
    translated?: boolean
    waveform?: number[]
    durationSec?: number
    status?: "sent" | "delivered" | "read"
}

type Props = {
    activeContact?: Contact
    msgs: ChatMessage[]
    text: string
    setText: (t: string) => void
    translate: boolean
    setTranslate: React.Dispatch<React.SetStateAction<boolean>>
    recording: boolean
    setRecording: React.Dispatch<React.SetStateAction<boolean>>
    bottomRef: React.RefObject<HTMLDivElement>
    d: AppDispatch
    activeId?: string
    onBack?: () => void
}

export default function ChatPane({
    activeContact, msgs,
    text, setText,
    translate, setTranslate,
    recording, setRecording,
    bottomRef, d, activeId,
    onBack
}: Props) {
    return (
        <section className="flex flex-col h-full">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-3 border-b border-border bg-panel">
                <div className="flex items-center gap-2">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="md:hidden mr-2 px-2 py-1 text-sm border rounded-md hover:bg-[var(--bg-soft)]"
                        >
                            Back
                        </button>
                    )}

                    <Avatar name={activeContact?.name || "?"} />
                    <div>
                        <div className="text-[15px] font-semibold">{activeContact?.name || "Select a chat"}</div>
                        <div className="text-[11px] text-text-dim">
                            {activeContact?.online ? "online" : "last seen recently"}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setTranslate(t => !t)}
                    className={`h-8 px-3 rounded-full border text-sm transition-colors
            ${translate ? "border-brand text-brand bg-[var(--brand-50)]"
                            : "border-border text-text-dim bg-panel hover:bg-[var(--bg-soft)]/60"}`}
                >
                    Translate
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-2 bg-bg flex flex-col justify-end gap-1.5">
                {msgs.map((m: ChatMessage) => {
                    const mine = m.from === "me"
                    const time = m.ts
                    const bubble = `inline-block max-w-[62ch] rounded-xl px-3 py-1.5 border ${mine ? "bg-bubbleOut border-brand/35" : "bg-bubbleIn border-border"
                        }`

                    return (
                        <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                            <div className={bubble}>
                                {m.kind === "text" && (
                                    <div className="whitespace-pre-wrap leading-relaxed text-[14px]">
                                        {m.translated ? (
                                            <div className="grid gap-1">
                                                <div>{m.text}</div>
                                                <Badge>translated</Badge>
                                            </div>
                                        ) : (
                                            <div>{m.text}</div>
                                        )}
                                    </div>
                                )}
                                {m.kind === "voice" && (
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex items-end gap-[2px] h-5">
                                            {(m.waveform || []).map((h: number, i: number) => (
                                                <WaveformBar key={i} h={Math.max(3, h - 3)} i={i} />
                                            ))}
                                        </div>
                                        <Mic size={14} className="text-text-dim opacity-70" />
                                        <div className="text-[11px] text-text-dim">{m.durationSec}s</div>
                                    </div>
                                )}
                                <div className={`mt-0.5 text-[11px] text-text-dim flex items-center gap-1 ${mine ? "justify-end" : ""}`}>
                                    <span>{time}</span>
                                    {mine &&
                                        (m.status === "read"
                                            ? <CheckCheck size={13} className="text-brand" />
                                            : <Check size={13} />)}
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>

            {/* Composer */}
            <div className="px-2 py-2 border-t border-border bg-panel">
                <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-full grid place-items-center hover:bg-[var(--bg-soft)]/60" aria-label="Attach">
                        <Paperclip size={16} />
                    </button>
                    <button className="w-9 h-9 rounded-full grid place-items-center hover:bg-[var(--bg-soft)]/60" aria-label="Emoji">
                        <SmilePlus size={16} />
                    </button>

                    <Input
                        className="flex-1 h-9 text-sm"
                        placeholder="Message"
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setText(e.target.value)
                            if (activeId) d(setTyping({ chatId: activeId, typing: e.target.value.length > 0 }))
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter" && text.trim()) {
                                d(sendText({ text, translate }))
                                setText("")
                                if (activeId) d(setTyping({ chatId: activeId, typing: false }))
                            }
                        }}
                    />

                    {text.trim().length > 0 ? (
                        <Button
                            onClick={() => {
                                d(sendText({ text, translate }))
                                setText("")
                                if (activeId) d(setTyping({ chatId: activeId, typing: false }))
                            }}
                            className="h-9 w-9 bg-brand hover:bg-brand-600 border-brand"
                            aria-label="Send"
                        >
                            <Send size={16} />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setRecording(r => !r)
                                if (!recording) d(sendVoice({ durationSec: 6 }))
                            }}
                            className="h-9 w-9 bg-brand hover:bg-brand-600 border-brand"
                            aria-label="Record voice"
                        >
                            <Mic size={16} />
                        </Button>
                    )}
                </div>
            </div>
        </section>
    )
}
