const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// All task routes require a valid JWT
router.use(auth);

// GET /api/tasks  — all tasks for the logged-in user
router.get('/', async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks  — add a task (mirrors "+ Add Task" / "+ Add" from a topic list)
router.post('/', async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: 'Title and category are required' });
    }
    const task = await Task.create({ user: req.user.id, title, category });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Could not create task', error: err.message });
  }
});

// PUT /api/tasks/:id  — toggle done / edit a task
router.put('/:id', async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (typeof req.body.done === 'boolean') {
    task.done = req.body.done;
    task.completedAt = req.body.done ? new Date() : null;
  }
  if (req.body.title) task.title = req.body.title;
  if (req.body.category) task.category = req.body.category;

  await task.save();
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

// DELETE /api/tasks  — "Reset" button equivalent, clears all of this user's tasks
router.delete('/', async (req, res) => {
  await Task.deleteMany({ user: req.user.id });
  res.json({ message: 'All tasks reset' });
});

module.exports = router;
