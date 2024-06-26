// routes/subjects.js

const express = require('express');
const router = express.Router();
const Subject = require('../models/subject'); // Import the Subject model

// POST a new subject
router.post('/subjects', async (req, res) => {
  const { name, code, numberOfQuestions, marks } = req.body;

  try {
    const newSubject = new Subject({
      name,
      code,
      numberOfQuestions,
      marks,
    });

    const savedSubject = await newSubject.save(); // Save the new subject to the database
    res.status(201).json(savedSubject); // Respond with the saved subject object
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;


