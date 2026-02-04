import { NextResponse } from 'next/server';
import { createInteraction } from '@/services/interactionService';
import { getUserById } from '@/services/userService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderId, receiverId } = body;

    if (!senderId || !receiverId) {
      return NextResponse.json({ error: 'Missing senderId or receiverId' }, { status: 400 });
    }

    if (senderId === receiverId) {
      return NextResponse.json({ error: 'Cannot send interaction to self' }, { status: 400 });
    }

    const sender = await getUserById(senderId);
    const receiver = await getUserById(receiverId);

    if (!sender || !receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const interaction = await createInteraction(senderId, receiverId);

    return NextResponse.json(interaction, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create interaction' }, { status: 500 });
  }
}
