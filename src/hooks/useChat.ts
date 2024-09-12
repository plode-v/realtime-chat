import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export const useChat = () => {
  const { user } = useUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (user) {
      fetchMessages()
    }
  }, [user])

  const fetchMessages = async () => {
    const response = await fetch('/api/chat')
    const data = await response.json()
    setMessages(data)
  }

  const sendMessage = async (message: string) => {
    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ message })
    })
  }
  

  return { messages, sendMessage }
}