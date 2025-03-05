// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const register = (req, res) => {
  db.query('SELECT * FROM users WHERE username = ?', [req.body.username], (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Username is already taken'});
    }

    bcrypt.hash(req.body.password.toString(), 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });

      db.query('INSERT INTO users (`username`, `password`, `role`) VALUES (?, ?, ?)', [
        req.body.username,
        hashedPassword,
        req.body.role   
      ], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

const login = (req, res) => {
  db.query('SELECT * FROM users WHERE username = ?', [req.body.username], (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then((result) => {
        if (err) return res.status(500).json({ error: 'Error comparing password' });
        if (result) {
          const username = user[0].username;
          const role = user[0].role; 
          const token = jwt.sign({ username, role }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
          res.cookie("token", token);
          res.status(200).json({ message: 'Logged in successfully' });
        } else {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      });
    } else {
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
};

const logout = (req, res) => {
  try{
    res.clearCookie("token"); // Clear the JWT token cookie
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Error clearing cookie' });
  }finally{
    return res.status(200).json({ message: 'Logged out successfully' });
  }
};

module.exports = { register, login, logout };
