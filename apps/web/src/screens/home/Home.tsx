import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectActiveChatId, seedDemo, markRead } from "@store/chat"

export default function Home() {
  const d = useDispatch()
  const activeId = useSelector(selectActiveChatId)

  useEffect(() => { d(seedDemo()) }, [d])
  useEffect(() => { if (activeId) d(markRead({ chatId: activeId })) }, [activeId, d])

  return <Navigate to="/chats" replace />
}
