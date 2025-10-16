import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import projectsRouter from './routes/projects.js';
import tasksRouter from './routes/tasks.js';
import statsRouter from './routes/stats.js';

const app = express();

app.set('etag', false);
app.use(cors({
  origin: (origin, cb) => {
    const allowed = (process.env.CORS_ORIGIN || 'http://localhost,http://localhost:5173')
      .split(',')
      .map(s => s.trim());
    if (!origin) return cb(null, true); 
    return cb(null, allowed.includes(origin));
  }
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/stats', statsRouter);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/labs';
const PORT = Number(process.env.PORT || 4000);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
}

start();


