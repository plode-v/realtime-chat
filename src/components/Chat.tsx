'use client'

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useChat } from "@/hooks/useChat"
import { Button } from "./ui/button"

export const Chat = () => {
  const { user } = useUser()
  const { messages, sendMessage } = useChat()
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  if (!user) return <div>Please sign in to chat</div>

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}