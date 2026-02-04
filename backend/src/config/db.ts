import mongoose from 'mongoose';

export let isMockMode = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nittio', {
        serverSelectionTimeoutMS: 5000 // Fail fast
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.warn('⚠️  Running in MOCK MODE (In-Memory Database) ⚠️');
    isMockMode = true;
    // Do not exit process
  }
};

export default connectDB;
