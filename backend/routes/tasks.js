const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tasks
router.get('/', (req, res) => {
  const { filter } = req.query;
  let query = 'SELECT * FROM tasks';
  if (filter === 'completed') query += ' WHERE completed = 1';
  if (filter === 'incomplete') query += ' WHERE completed = 0';

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new task
router.post('/', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO tasks (title) VALUES (?)', [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, completed: 0 });
  });
});

// Toggle task completion
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  db.run(
    'UPDATE tasks SET completed = NOT completed WHERE id = ?',
    [id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: true });
    }
  );
});

module.exports = router;