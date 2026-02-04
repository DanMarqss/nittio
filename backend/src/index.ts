import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import interactionRoutes from './routes/interactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/users', userRoutes);
  app.use('/api/interactions', interactionRoutes);

  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
