const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');
const authenticate = require('../Middleware/authUser');

// All routes are protected
router.post('/create', authenticate, taskController.createTask);
router.get('/getall', authenticate, taskController.getUserTasks);
router.patch('/:id/complete', authenticate, taskController.markAsCompleted);
router.delete('/:id', authenticate, taskController.deleteTask);
router.put('/update/:id', authenticate, taskController.updateTask);

module.exports = router;
