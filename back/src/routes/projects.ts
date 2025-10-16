import { Router } from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const router = Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
});

// READ all
router.get('/', async (_req, res) => {
  const projects = await Project.find().lean();
  const counts = await Task.aggregate([
    { $group: { _id: { project: '$project', status: '$status' }, count: { $sum: 1 } } }
  ]);
  const byProject: Record<string, { ToDo?: number; in_progress?: number; Done?: number }> = {};
  for (const row of counts as any[]) {
    const pid = String(row._id.project);
    const status = row._id.status as 'ToDo'|'in_progress'|'Done';
    byProject[pid] = byProject[pid] || {};
    byProject[pid][status] = row.count;
  }
  const withCounts = projects.map((p:any) => {
    const c = byProject[String(p._id)] || {};
    const todo = c['ToDo'] || 0;
    const inprog = c['in_progress'] || 0;
    const done = c['Done'] || 0;
    return { ...p, todoCount: todo, inProgressCount: inprog, doneCount: done, totalTasks: todo + inprog + done };
  });
  res.set('Cache-Control', 'no-store');
  res.json(withCounts);
});

// READ by id
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  await Task.deleteMany({ project: deleted._id });
  res.json({ ok: true });
});

export default router;


