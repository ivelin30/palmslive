const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser');
const db = require('../config/db');
const bcrypt = require('bcrypt')  

router.get('/', verifyUser, (req, res) => {
  res.status(200).json({ 
    username: req.username,
    role: req.role
   });
});

router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    // Remove password from each user object
    const usersWithoutPassword = result.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword; 
    });

    res.status(200).json(usersWithoutPassword);
  });
});

router.post('/:id/delete', (req, res) => {
  const {id} = req.params;
  db.query('DELETE FROM users WHERE id =?', [id], (err, result) => {
    if(err){
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  })
})

router.post('/:id/edit-password', (req, res) => {
  const {id} = req.params;
  const {password} = req.body;
  
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing password' });

    db.query('UPDATE users SET password = ? WHERE id = ?', [
      hashedPassword,
      id   
    ], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
})

router.post('/:id/edit-role', (req, res) => {
  const {id} = req.params;
  const {role} = req.body;

  db.query('UPDATE users SET role = ? WHERE id = ?', [role, id], (err) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  
    }
  res.status(201).json({ message: 'User role updated successfully' });
  });
})

module.exports = router;
