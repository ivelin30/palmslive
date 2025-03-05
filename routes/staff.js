const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM staff', (err, result) => {
    if(err){
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(200).json(result);
  });
})
router.post('/:id/delete', (req, res) => {
  db.query('DELETE FROM staff WHERE id =?', [req.params.id], (err, result) => {
    if(err){
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully' });
  });
})

router.post('/add' , (req, res) => {
  const {name, position, phone} = req.body;

  db.query('INSERT INTO staff (name, position, phone) VALUES (?,?,?)', [name, position, phone], (err, result) => {
    if(err){
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(201).json({ message: 'Staff member added successfully' });
  });

})

module.exports = router;