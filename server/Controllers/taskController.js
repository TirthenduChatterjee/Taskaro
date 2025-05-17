const Task = require('../Models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority,createdFor } = req.body;

    const task = new Task({
      title,
      description,
      priority: priority || 'medium',
      createdFor,// default
      user: req.user.id
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for the authenticated user
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark a task as completed
exports.markAsCompleted = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'completed';
    await task.save();

    res.json({ message: 'Task marked as completed', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, createdFor, status } = req.body;
    console.log('req.body', req.body)
    // Find the task that belongs to the current user
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update only the fields provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (createdFor !== undefined) task.createdFor = createdFor;
    if (status !== undefined) task.status = status;

    await task.save();
    console.log('task', task)
    res.json({ message: 'Task updated successfully', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

