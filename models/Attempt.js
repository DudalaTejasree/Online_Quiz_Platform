const mongoose = require('mongoose');

// Attempt Schema Definition (stores quiz attempt records)
const attemptSchema = new mongoose.Schema(
  {
    // Username of the student
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // Reference to the Quiz
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    // Score obtained (number of correct answers)
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    // Total number of questions in the quiz
    totalQuestions: {
      type: Number,
      required: true,
    },
    // Date and time of the attempt
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Attempt model
module.exports = mongoose.model('Attempt', attemptSchema);
