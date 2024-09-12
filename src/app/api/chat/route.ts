import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { saveMessage, getMessages } from "@/lib/chat-utils";

export const POST = async (req: NextRequest) => {
  const { userId } = getAuth(req)
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { message } = await req.json()
  await saveMessage(userId, message)

  return NextResponse.json({ success: true });
}

export const GET = async (req: NextRequest) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const messages = await getMessages(userId)

  return NextResponse.json(messages)
}

