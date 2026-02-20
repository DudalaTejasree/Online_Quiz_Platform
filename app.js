// Core dependencies
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Initialize Express application
const app = express();

// ==================== MIDDLEWARE ====================
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: 'your-secret-key-change-this-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Make session data available in views
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.fullname = req.session.fullname;
  res.locals.role = req.session.role;
  next();
});

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// ==================== DATABASE CONNECTION ====================
// Connect to MongoDB before starting server
connectDB();

// ==================== ROUTES ====================
// Auth routes (no authentication required)
app.use('/', authRoutes);

// All quiz routes (authentication required)
app.use('/', quizRoutes);

// 404 - Page not found
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ Open your browser and go to http://localhost:${PORT}`);
});
