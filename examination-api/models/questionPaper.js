// models/questionPaper.js

const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  questions: [
    {
      questionNumber: { type: Number, required: true },
      question: { type: String, required: true },
      answerOptions: [String],
      theoryWritingSection: { type: String, required: true },
      submittedResponse: { type: String },
    },
  ],
});

module.exports = mongoose.model('QuestionPaper', questionPaperSchema);
