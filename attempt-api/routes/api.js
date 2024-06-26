const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get a random question
router.get('/question', async (req, res) => {
    try {
        const count = await Question.countDocuments();
        const random = Math.floor(Math.random() * count);
        const question = await Question.findOne().skip(random);
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Submit an answer
router.post('/submit-answer', async (req, res) => {
    const { questionId, selectedAnswer } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        const correctAnswer = question.correctAnswer;
        const isCorrect = (selectedAnswer === correctAnswer);
        res.json({ correct: isCorrect });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
