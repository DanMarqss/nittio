import Interaction from '@/models/Interaction';
import dbConnect, { isMockMode } from '@/lib/db';
import { MOCK_INTERACTIONS } from '@/lib/mockData';

export async function createInteraction(senderId: string, receiverId: string) {
  await dbConnect();

  if (isMockMode()) {
    const interaction = {
      id: Date.now().toString(),
      sender: senderId,
      receiver: receiverId,
      createdAt: new Date(),
    };
    MOCK_INTERACTIONS.push(interaction);
    return interaction;
  }

  return await Interaction.create({
    sender: senderId,
    receiver: receiverId,
  });
}
