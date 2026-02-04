import { Request, Response } from 'express';
import User from '../models/User';
import { isMockMode } from '../config/db';

const MOCK_USERS = [
  { _id: '1', name: 'Alice', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { _id: '2', name: 'Bob', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { _id: '3', name: 'Charlie', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  { _id: '4', name: 'Diana', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana' },
  { _id: '5', name: 'Evan', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Evan' },
];

export const getUsers = async (req: Request, res: Response) => {
  try {
    if (isMockMode) {
        // Mock Mode
        return res.json(MOCK_USERS.map(u => ({ id: u._id, name: u.name, photo: u.photo })));
    }

    // Real DB Mode
    const count = await User.countDocuments();
    if (count === 0) {
      const seed = MOCK_USERS.map(u => ({ name: u.name, photo: u.photo }));
      await User.insertMany(seed);
    }
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserByIdMock = (id: string) => {
    return MOCK_USERS.find(u => u._id === id);
}
