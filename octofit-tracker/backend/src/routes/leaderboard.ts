import { Router } from 'express';

import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const entries = await Leaderboard.find()
    .populate('user')
    .populate('team')
    .sort({ score: -1 });
  res.json(entries);
});

leaderboardRouter.post('/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

export default leaderboardRouter;
