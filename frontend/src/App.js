import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { api } from './api';

function App() {
  // Force rebuild for environment variable
  console.log('API URL:', process.env.REACT_APP_API_URL);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      
      const tasksData = await api.listTasks();
      setTasks(tasksData);
    } catch (err) {
      setError('Error loading tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle new task creation
  const handleTaskCreated = (newTask) => {
  setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Handle task updates
  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Handle task deletion
  const handleTaskDeleted = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Taskify</h1>
        <p>Simple & efficient task management</p>
      </header>

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={fetchTasks}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Retry
          </button>
        </div>
      )}

      <TaskForm
        onTaskCreated={handleTaskCreated}
        editingTask={editingTask}
        onTaskUpdated={handleTaskUpdated}
        onCancelEdit={handleCancelEdit}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

export default App;