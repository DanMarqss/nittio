import { Request, Response } from 'express';
import Interaction from '../models/Interaction';
import User from '../models/User';
import { isMockMode } from '../config/db';
import { getUserByIdMock } from './userController';

// In-memory storage for interactions in mock mode
const MOCK_INTERACTIONS: any[] = [];

export const createInteraction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      res.status(400).json({ error: 'Missing senderId or receiverId' });
      return;
    }

    if (senderId === receiverId) {
      res.status(400).json({ error: 'Cannot send interaction to self' });
      return;
    }

    if (isMockMode) {
        // Mock Mode Validation
        const sender = getUserByIdMock(senderId);
        const receiver = getUserByIdMock(receiverId);

        if (!sender || !receiver) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const interaction = {
            _id: Date.now().toString(),
            sender: senderId,
            receiver: receiverId,
            createdAt: new Date()
        };
        MOCK_INTERACTIONS.push(interaction);
        res.status(201).json(interaction);
        return;
    }

    // Real DB Mode
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const interaction = await Interaction.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(interaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create interaction' });
  }
};
