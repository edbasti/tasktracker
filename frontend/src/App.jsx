import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/api/tasks?filter=${filter}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });
    setNewTask('');
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'PATCH' });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Minimal Task Tracker</h1>
      <div className="filters">
        {['all', 'completed', 'incomplete'].map(f => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
  );
}

export default App;
