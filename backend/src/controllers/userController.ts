import { Request, Response } from 'express';
import User from '../models/User';
import { isMockMode } from '../config/db';

const MOCK_USERS = [
  { _id: '1', name: 'Julia Silva', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Julia&backgroundColor=b6e3f4' },
  { _id: '2', name: 'Pedro Santos', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Pedro&backgroundColor=c0aede' },
  { _id: '3', name: 'Larissa Manoela', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Larissa&backgroundColor=ffdfbf' },
  { _id: '4', name: 'João Guilherme', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Joao&backgroundColor=d1d4f9' },
  { _id: '5', name: 'Maisa', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Maisa&backgroundColor=ffd5dc' },
  { _id: '6', name: 'Zezé', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Zeze&backgroundColor=c0aede' },
  { _id: '7', name: 'Anitta', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Anitta&backgroundColor=ffdfbf' },
  { _id: '8', name: 'Neymar', photo: 'https://api.dicebear.com/7.x/lorelei/svg?seed=Neymar&backgroundColor=b6e3f4' },
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
