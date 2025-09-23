import React, { useState } from 'react';
import { api } from '../api';

const TaskForm = ({ onTaskCreated, editingTask, onTaskUpdated, onCancelEdit }) => {
  const [title, setTitle] = useState(editingTask ? editingTask.title : '');
  const [description, setDescription] = useState(editingTask ? editingTask.description : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim()
      };

      if (editingTask) {
        const updatedTask = await api.updateTask(editingTask.id, taskData);
        onTaskUpdated(updatedTask);
        onCancelEdit();
      } else {
        const newTask = await api.createTask(taskData);
        onTaskCreated(newTask);
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (editingTask) {
      onCancelEdit();
    } else {
      setTitle('');
      setDescription('');
      setError('');
    }
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            disabled={loading}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)..."
            disabled={loading}
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleCancel}
            disabled={loading}
          >
            {editingTask ? 'Cancel' : 'Clear'}
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;