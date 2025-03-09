import React from 'react';

const TaskList = ({ tasks, onToggle }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <span>{task.title}</span>
          <button
            onClick={() => onToggle(task.id)}
            className={task.completed ? 'undo' : 'complete'}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
