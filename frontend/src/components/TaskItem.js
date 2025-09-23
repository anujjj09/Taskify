import React from 'react';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted, onEditTask }) => {
  const handleToggleComplete = async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task');
      }

      const updatedTask = await response.json();
      onTaskUpdated(updatedTask);
    } catch (err) {
      alert('Error updating task: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task');
      }

      onTaskDeleted(task.id);
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}> 
      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
        </div>
        
        <div className="task-details">
          <div className="task-title-row">
            <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h3>
            <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>{task.completed ? 'Done' : 'Active'}</span>
          </div>
          
          {task.description && (
            <p className="task-description">
              {task.description}
            </p>
          )}
          
          <div className="task-meta">
            <span>Created: {formatDate(task.createdAt)}</span>
            {task.updatedAt !== task.createdAt && (
              <span> • Updated: {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="task-actions">
        <button
          className="btn btn-small btn-secondary"
          onClick={() => onEditTask(task)}
          aria-label={`Edit task "${task.title}"`}
        >
          Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={handleDelete}
          aria-label={`Delete task "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;