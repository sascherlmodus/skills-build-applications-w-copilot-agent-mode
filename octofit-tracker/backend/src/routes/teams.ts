import { Router } from 'express';

import Team from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').sort({ points: -1 });
  res.json(teams);
});

teamsRouter.post('/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

export default teamsRouter;
