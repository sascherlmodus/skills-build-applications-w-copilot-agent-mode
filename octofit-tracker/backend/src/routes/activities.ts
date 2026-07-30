import { Router } from 'express';

import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').sort({ performedAt: -1 });
  res.json(activities);
});

activitiesRouter.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

export default activitiesRouter;
