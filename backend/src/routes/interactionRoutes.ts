import express from 'express';
import { createInteraction } from '../controllers/interactionController';

const router = express.Router();

router.post('/', createInteraction);

export default router;
