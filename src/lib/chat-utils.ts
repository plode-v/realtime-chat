import { db } from "./db";

interface ChatMessage {
  message: string
  timestamp: number
}

export const saveMessage = async (userId: string, message: string) => {
  const timestamp = Date.now();
  await db.zadd(`user:${userId}:messages`, {
    score: timestamp,
    member: JSON.stringify({ message, timestamp })
  })
}

export const getMessages = async (userId: string, limit = 50) => {
  const messages = await db.zrange(`user:${userId}:messages`, 0, limit - 1, { rev: true })
  return messages.map(msg => JSON.parse(msg as string) as ChatMessage)
}

export const saveUserProfile = async (userId: string, profile: Record<string, unknown>) => {
  await db.hset(`user:${userId}`, profile)
}

export const getUserProfile = async (userId: string) => {
  return await db.hgetall(`user:${userId}`)
}