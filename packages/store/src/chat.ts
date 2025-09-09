import { createSlice, nanoid, PayloadAction, createSelector } from "@reduxjs/toolkit"

type Contact = { id: string; name: string; handle: string; online?: boolean }
type MsgStatus = "sent" | "delivered" | "read"
type BaseMessage = { id: string; chatId: string; from: "me" | "them"; ts: number; status?: MsgStatus; translated?: boolean; original?: string }
type TextMessage = BaseMessage & { kind: "text"; text: string }

type VoiceMessage = BaseMessage & {
    kind: "voice"
    durationSec: number
    waveform: number[]
    translatedText?: string
}

type Message = TextMessage | VoiceMessage
type Chat = { id: string; title: string; contactId: string; typing?: boolean }

type State = { contacts: Contact[]; chats: Chat[]; messages: Message[]; activeChatId?: string }
const initial: State = { contacts: [], chats: [], messages: [] }

function wave(n = 24) { return Array.from({ length: n }, () => Math.max(2, Math.min(18, Math.round(Math.random() * 18)))) }

const slice = createSlice({
    name: "chat",
    initialState: initial,
    reducers: {
        seedDemo: (s) => {
            if (s.contacts.length) return
            const a: Contact = { id: "c1", name: "Akvile Petrauskaite", handle: "@akvile", online: true }
            const b: Contact = { id: "c2", name: "Tomas Jankus", handle: "@tomas", online: false }
            s.contacts.push(a, b)
            const chat1: Chat = { id: "ch1", title: "Akvile", contactId: a.id }
            const chat2: Chat = { id: "ch2", title: "Tomas", contactId: b.id }
            s.chats.push(chat1, chat2)
            s.activeChatId = chat1.id
            s.messages.push(
                { id: nanoid(), chatId: chat1.id, from: "them", ts: Date.now() - 3600000, kind: "text", text: "Labas! Kaip laikaisi?", status: "delivered" },
                { id: nanoid(), chatId: chat1.id, from: "me", ts: Date.now() - 3500000, kind: "text", text: "Puikiai, dirbu su BARIA-MVP.", status: "read" },
                { id: nanoid(), chatId: chat1.id, from: "them", ts: Date.now() - 3400000, kind: "voice", durationSec: 7, waveform: wave() },
                { id: nanoid(), chatId: chat2.id, from: "them", ts: Date.now() - 1800000, kind: "text", text: "Ar turėsim dizainą šiandien?", status: "delivered" }
            )
        },
        setActive: (s, a: PayloadAction<string>) => { s.activeChatId = a.payload },
        setTyping: (s, a: PayloadAction<{ chatId: string; typing: boolean }>) => {
            const c = s.chats.find(x => x.id === a.payload.chatId); if (c) c.typing = a.payload.typing
        },
        sendText: (s, a: PayloadAction<{ text: string; translate?: boolean }>) => {
            if (!s.activeChatId) return
            const translated = a.payload.translate
            const original = translated ? a.payload.text : undefined
            const text = translated ? "[LT] " + a.payload.text : a.payload.text
            s.messages.push({ id: nanoid(), chatId: s.activeChatId, from: "me", ts: Date.now(), kind: "text", text, translated, original, status: "sent" })
        },
        sendVoice: (s, a: PayloadAction<{ durationSec: number; translatedText?: string }>) => {
            if (!s.activeChatId) return
            s.messages.push({
                id: nanoid(),
                chatId: s.activeChatId,
                from: "me",
                ts: Date.now(),
                kind: "voice",
                durationSec: a.payload.durationSec,
                waveform: wave(),
                status: "sent",
                translatedText: a.payload.translatedText
            })
        },
        markRead: (s, a: PayloadAction<{ chatId: string }>) => {
            s.messages.forEach(m => { if (m.chatId === a.payload.chatId && m.from === "me") m.status = "read" })
        }
    }
})

export default slice.reducer
export const { seedDemo, setActive, setTyping, sendText, sendVoice, markRead } = slice.actions

export const selectContacts = (r: any) => r.chat.contacts as Contact[]
export const selectChats = (r: any) => r.chat.chats as Chat[]
export const selectActiveChatId = (r: any) => r.chat.activeChatId as string | undefined
export const selectMessages = (r: any) => r.chat.messages as Message[]
export const selectMessagesByActive = createSelector([selectMessages, selectActiveChatId], (msgs, id) => id ? msgs.filter(m => m.chatId === id) : [])
export type { Message, TextMessage, VoiceMessage, Chat, Contact, MsgStatus }
