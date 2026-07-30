import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './config/database';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();
