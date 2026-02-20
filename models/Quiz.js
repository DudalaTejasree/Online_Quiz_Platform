const mongoose = require('mongoose');

// Quiz Schema Definition
const quizSchema = new mongoose.Schema(
  {
    // Title of the quiz
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Array of questions
    questions: [
      {
        // The question text
        questionText: {
          type: String,
          required: true,
        },
        // 4 multiple choice options
        options: {
          type: [String],
          required: true,
          validate: {
            validator: function (v) {
              return v.length === 4;
            },
            message: 'Each question must have exactly 4 options',
          },
        },
        // Index of correct answer (0, 1, 2, or 3)
        correctAnswer: {
          type: Number,
          required: true,
          min: 0,
          max: 3,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export the Quiz model
module.exports = mongoose.model('Quiz', quizSchema);
