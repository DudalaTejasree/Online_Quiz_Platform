const express = require('express');
const User = require('../models/User');

const router = express.Router();

// ==================== SIGNUP ====================
// GET /signup - Display signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST /signup - Handle user registration
router.post('/signup', async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, role } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).render('signup', {
        error: 'Passwords do not match',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('signup', {
        error: 'Email already registered. Please login instead.',
      });
    }

    // Create new user
    const user = new User({
      fullname,
      email,
      password,
      role: role === 'teacher' ? 'teacher' : 'student',
    });

    // Save user to database
    await user.save();

    // Automatically log in the user
    req.session.userId = user._id;
    req.session.fullname = user.fullname;
    req.session.role = user.role;

    // Redirect to home for both roles; UI will show role-appropriate actions
    res.redirect('/');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).render('signup', {
      error: 'Error creating account. Please try again.',
    });
  }
});

// ==================== LOGIN ====================
// GET /login - Display login form
router.get('/login', (req, res) => {
  res.render('login');
});

// POST /login - Handle user authentication
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).render('login', {
        error: 'Please provide both email and password',
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('login', {
        error: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).render('login', {
        error: 'Invalid email or password',
      });
    }

    // Set session
    req.session.userId = user._id;
    req.session.fullname = user.fullname;
    req.session.role = user.role;

    // Redirect to home for both roles; UI will show role-appropriate actions
    res.redirect('/');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).render('login', {
      error: 'Error logging in. Please try again.',
    });
  }
});

// ==================== LOGOUT ====================
// GET /logout - logout user
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

module.exports = router;
