// models/subject.js

const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  numberOfQuestions: { type: Number, required: true },
  marks: { type: Number, required: true },
});

module.exports = mongoose.model('Subject', subjectSchema);
