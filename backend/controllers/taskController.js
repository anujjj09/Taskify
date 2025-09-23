const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/tasks.json');

// Ensure the data file exists
const initializeDataFile = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
  }
};

// Read tasks from JSON file
const readTasks = () => {
  try {
    initializeDataFile();
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
};

// Write tasks to JSON file
const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing tasks:', error);
    return false;
  }
};

// Get all tasks
const getAllTasks = (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Get a single task by ID
const getTaskById = (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

// Create a new task
const createTask = (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const tasks = readTasks();
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    
    if (writeTasks(tasks)) {
      res.status(201).json(newTask);
    } else {
      res.status(500).json({ error: 'Failed to create task' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update a task
const updateTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Update only provided fields
    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      tasks[taskIndex].title = title.trim();
    }
    
    if (description !== undefined) {
      tasks[taskIndex].description = description.trim();
    }
    
    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }
    
    tasks[taskIndex].updatedAt = new Date().toISOString();
    
    if (writeTasks(tasks)) {
      res.json(tasks[taskIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update task' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
const deleteTask = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    
    if (writeTasks(tasks)) {
      res.json({ message: 'Task deleted successfully', task: deletedTask });
    } else {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};