const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error fetching inventory' });
    }

    res.status(200).json(results);
    })  
})

router.post('/add', (req, res) => {
  const {item, available} = req.body;

  db.query('INSERT INTO inventory (item, available) VALUES (?,?)', [item, available], (err, result) => {
    if(err){
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(201).json({ message: 'Item added successfully', id: result.insertId });
  })

})

router.post('/:id/update', (req, res) => {
  const {id} = req.params;
  const {column, value} = req.body;
  
  db.query('UPDATE inventory SET? WHERE id =?', [{[column]: value}, id], (err) => {
    if(err){
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    
    res.status(200).json({ message: 'Item updated successfully' });
  })

})

module.exports = router;