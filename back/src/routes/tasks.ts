import { Router } from 'express';
import Task from '../models/Task.js';

const router = Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
});

// READ all (optionally by project)
router.get('/', async (req, res) => {
  const { project } = req.query;
  const filter:any = {};
  if (project) filter.project = project;
  const tasks = await Task.find(filter).lean();
  res.json(tasks);
});

// READ by id
router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id).lean();
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;


