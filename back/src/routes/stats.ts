import { Router } from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const router = Router();

// GET /api/stats/summary
// { projects: number, totalTasks: number, doneTasks: number }
router.get('/summary', async (_req, res) => {
  const [projectsCount, tasksAgg] = await Promise.all([
    Project.countDocuments(),
    Task.aggregate([
      { $group: { _id: null, total: { $sum: 1 }, done: { $sum: { $cond: [{ $eq: ['$status', 'Done'] }, 1, 0] } } } }
    ])
  ]);
  const totalTasks = tasksAgg[0]?.total || 0;
  const doneTasks = tasksAgg[0]?.done || 0;
  res.set('Cache-Control', 'no-store');
  res.json({ projects: projectsCount, totalTasks, doneTasks });
});

// GET /api/stats/projects-overview
// [{ _id, name, totalTasks, doneTasks }]
router.get('/projects-overview', async (_req, res) => {
  const projects = await Project.find({}, { name: 1 }).lean();
  const counts = await Task.aggregate([
    { $group: { _id: { project: '$project', isDone: { $eq: ['$status', 'Done'] } }, count: { $sum: 1 } } }
  ]);
  const byProject: Record<string, { total: number; done: number }> = {};
  for (const row of counts as any[]) {
    const pid = String(row._id.project);
    const isDone = !!row._id.isDone;
    const bucket = (byProject[pid] ||= { total: 0, done: 0 });
    bucket.total += row.count;
    if (isDone) bucket.done += row.count;
  }
  const result = projects.map((p: any) => {
    const c = byProject[String(p._id)] || { total: 0, done: 0 };
    return { _id: String(p._id), name: p.name, totalTasks: c.total, doneTasks: c.done };
  });
  res.set('Cache-Control', 'no-store');
  res.json(result);
});

export default router;


