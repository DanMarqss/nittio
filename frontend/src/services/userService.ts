import User, { IUser } from '@/models/User';
import dbConnect, { isMockMode } from '@/lib/db';
import { MOCK_USERS } from '@/lib/mockData';

export async function getUsers() {
  await dbConnect();
  
  if (isMockMode()) {
    return MOCK_USERS;
  }

  // Seeding Logic for Real DB
  const count = await User.countDocuments();
  if (count === 0) {
    const seed = MOCK_USERS.map(u => ({ name: u.name, photo: u.photo }));
    await User.insertMany(seed);
  }

  return await User.find({});
}

export async function getUserById(id: string) {
  await dbConnect();

  if (isMockMode()) {
    return MOCK_USERS.find(u => u.id === id);
  }

  return await User.findById(id);
}
