import { Router } from 'express';

import Workout from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

workoutsRouter.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default workoutsRouter;
