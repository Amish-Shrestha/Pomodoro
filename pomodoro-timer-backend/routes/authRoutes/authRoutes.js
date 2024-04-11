const express = require('express')
const jwt = require('jsonwebtoken');


const authRouter = express.Router();



authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign({ username }, process.env.JWT_encrypt, { expiresIn: '1h' }); 
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });

// // Routes
// router.get('/tasks', (req, res) => {
//     connection.query('SELECT * FROM tasks', (error, results) => {
//       if (error) {
//         res.status(500).send('Error fetching tasks from database');
//       } else {
//         res.json(results);
//       }
//     });
//   });
  
//   app.post('/tasks', (req, res) => {
//     const { task, estimatedCycles } = req.body;
//     connection.query('INSERT INTO tasks (task, estimated_cycles) VALUES (?, ?)', [task, estimatedCycles], (error, results) => {
//       if (error) {
//         res.status(500).send('Error adding task to database');
//       } else {
//         res.status(201).send('Task added successfully');
//       }
//     });
//   });

module.exports = authRouter;