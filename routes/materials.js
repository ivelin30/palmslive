const express = require('express');
const router = express.Router();
const db = require('./../config/db');
const { uploadDocuments } = require('../config/multer');


router.get('/', (req, res) => {
  db.query('SELECT * FROM materials', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
      }
    res.status(200).json(results);
  })
})

router.post('/:id/delete', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Missing material ID' });
  }

  db.query('DELETE FROM materials WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
      res.status(200).json({ message: 'Material deleted successfully' });
    })
  })

router.post('/add', uploadDocuments.single('file'), async (req, res) => {
  const title = req.body.title;
  const  file = req.file;

  if (!title || !file) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query('INSERT INTO materials (title, file) VALUES (?, ?)', [title, file.originalname], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.status(201).json({ message: 'Material added successfully' });
  })
 })

module.exports = router