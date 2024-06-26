const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (assuming you have already set up your MongoDB connection)
mongoose.connect('mongodb://localhost:27017/quizdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// Define a schema and model for questions (assuming you have a schema defined)
const questionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    correctAnswer: Number // Assuming correctAnswer is the index of the correct option
});
const Question = mongoose.model('Question', questionSchema);

// POST route to create a new question
app.post('/api/questions', async (req, res) => {
    try {
        const { text, options, correctAnswer } = req.body;

        // Create a new question document
        const newQuestion = new Question({
            text: text,
            options: options,
            correctAnswer: correctAnswer
        });

        // Save the question to the database
        const savedQuestion = await newQuestion.save();

        // Respond with the saved question data
        res.json(savedQuestion);
    } catch (err) {
        console.error('Error creating question:', err);
        res.status(500).json({ error: 'Error creating question' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
