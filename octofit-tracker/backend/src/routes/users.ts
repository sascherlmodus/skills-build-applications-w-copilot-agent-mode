import { Router } from 'express';

import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

export default usersRouter;
