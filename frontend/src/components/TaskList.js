import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, onTaskUpdated, onTaskDeleted, onEditTask }) => {
  if (loading) {
    return (
      <div className="task-list">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const completionPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <div className="task-count">
          {totalCount === 0 ? (
            'No tasks yet'
          ) : (
            `${completedCount} of ${totalCount} completed · ${completionPercent}%`
          )}
        </div>
        {totalCount > 0 && (
          <div className="progress-bar" aria-label="Task completion progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={completionPercent} role="progressbar">
            <div className="progress-fill" style={{ width: `${completionPercent}%` }} />
          </div>
        )}
      </div>
      
      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Start by adding your first task above!</p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;