// routes/questionPapers.js

const express = require('express');
const router = express.Router();
const QuestionPaper = require('../models/questionPaper');

// POST a new question paper
router.post('/', async (req, res) => {
  const questionPaper = new QuestionPaper({
    subject: req.body.subject,
    questions: req.body.questions,
  });

  try {
    const newQuestionPaper = await questionPaper.save();
    res.status(201).json(newQuestionPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) response for a question
router.put('/:id/questions/:questionId', async (req, res) => {
  try {
    const questionPaper = await QuestionPaper.findById(req.params.id);
    if (!questionPaper) {
      return res.status(404).json({ message: 'Question paper not found' });
    }

    const question = questionPaper.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.submittedResponse = req.body.submittedResponse;
    await questionPaper.save();
    res.json(questionPaper);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
