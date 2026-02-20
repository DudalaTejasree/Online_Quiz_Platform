const express = require('express');
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const User = require('../models/User');

const router = express.Router();

// ==================== AUTHENTICATION MIDDLEWARE ====================
// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Middleware to check if user is a teacher
const isTeacher = (req, res, next) => {
  if (!req.session.userId) return res.redirect('/login');
  if (req.session.role !== 'teacher') {
    return res.status(403).send('Access denied. Teachers only.');
  }
  next();
};

// Middleware to check if user is a student
const isStudent = (req, res, next) => {
  if (!req.session.userId) return res.redirect('/login');
  if (req.session.role !== 'student') {
    return res.status(403).send('Access denied. Students only.');
  }
  next();
};

// ==================== HOME PAGE ====================
// GET / - Display home page with all options
router.get('/', (req, res) => {
  // If not logged in, redirect to login
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('index', { fullname: req.session.fullname, role: req.session.role });
});

// ==================== CREATE QUIZ ====================
// GET /create - Display form to create a new quiz (teachers only)
router.get('/create', isTeacher, (req, res) => {
  res.render('create');
});

// POST /create - Handle quiz creation
// Saves the quiz to MongoDB
router.post('/create', isTeacher, async (req, res) => {
  try {
    const { title, questionCount } = req.body;
    const questions = [];

    // Parse questions from form data
    for (let i = 0; i < parseInt(questionCount); i++) {
      const questionText = req.body[`questionText_${i}`];
      const correctAnswer = req.body[`correctAnswer_${i}`];
      const options = [
        req.body[`option_${i}_0`],
        req.body[`option_${i}_1`],
        req.body[`option_${i}_2`],
        req.body[`option_${i}_3`],
      ];

      questions.push({
        questionText,
        options,
        correctAnswer: parseInt(correctAnswer),
      });
    }

    // Create new Quiz document
    const quiz = new Quiz({
      title,
      questions,
    });

    // Save to database
    await quiz.save();

    // Redirect to quiz list page
    res.redirect('/quizzes');
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).send('Error creating quiz');
  }
});

// ==================== LIST ALL QUIZZES ====================
// GET /quizzes - Display all available quizzes
router.get('/quizzes', isAuthenticated, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.render('quizzes', { quizzes, fullname: req.session.fullname, role: req.session.role });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).send('Error fetching quizzes');
  }
});

// ==================== ATTEMPT QUIZ ====================
// GET /quiz/:id - Display quiz questions for attempting
// Students attempt quiz only
router.get('/quiz/:id', isStudent, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.render('quiz', { quiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).send('Error fetching quiz');
  }
});

// POST /submit/:id - Process quiz submission and calculate score
// Score calculation happens in backend for security
router.post('/submit/:id', isStudent, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    // Use fullname from session instead of form input
    const username = req.session.fullname;
    let score = 0;

    // Calculate score by comparing user answers with correct answers
    quiz.questions.forEach((question, index) => {
      const userAnswer = parseInt(req.body[`answer_${index}`]);
      if (userAnswer === question.correctAnswer) {
        score++;
      }
    });

    // Calculate percentage
    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Save attempt to database
    const attempt = new Attempt({
      username,
      quizId: quiz._id,
      score,
      totalQuestions,
    });

    await attempt.save();

    // Render result page with score
    res.render('result', {
      quizTitle: quiz.title,
      score,
      totalQuestions,
      percentage,
      username,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).send('Error submitting quiz');
  }
});

// ==================== TEACHER: LIST STUDENTS & SEARCH ====================
// GET /students - list or search students (teachers only)
router.get('/students', isTeacher, async (req, res) => {
  try {
    const q = req.query.q || '';
    let students;
    if (q) {
      const regex = new RegExp(q, 'i');
      students = await User.find({ role: 'student', $or: [{ fullname: regex }, { email: regex }] });
    } else {
      students = await User.find({ role: 'student' });
    }
    res.render('students', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Error fetching students');
  }
});

// GET /students/:username/attempts - view attempts for a student (teachers only)
router.get('/students/:username/attempts', isTeacher, async (req, res) => {
  try {
    const username = decodeURIComponent(req.params.username);
    const attempts = await Attempt.find({ username }).populate('quizId');
    res.render('studentAttempts', { username, attempts });
  } catch (error) {
    console.error('Error fetching student attempts:', error);
    res.status(500).send('Error fetching attempts');
  }
});

// GET /quiz/:id/attempts - view all attempts for a quiz (teachers only)
router.get('/quiz/:id/attempts', isTeacher, async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).send('Quiz not found');
    const attempts = await Attempt.find({ quizId }).populate('quizId');
    res.render('quizAttempts', { quiz, attempts });
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    res.status(500).send('Error fetching quiz attempts');
  }
});

// ==================== VIEW PAST ATTEMPTS ====================
// GET /attempts - Display past attempts for logged-in user
router.get('/attempts', isAuthenticated, async (req, res) => {
  try {
    const username = req.session.fullname;

    // Fetch all attempts for the logged-in user
    // Populate quiz details for better display
    const userAttempts = await Attempt.find({ username }).populate('quizId');

    res.render('attemptHistory', { username, attempts: userAttempts });
  } catch (error) {
    console.error('Error fetching attempts:', error);
    res.status(500).send('Error fetching attempts');
  }
});

module.exports = router;
