const mongoose = require('mongoose');

// MongoDB Connection Setup
const connectDB = async () => {
  try {
    // MongoDB Atlas Connection (Cloud-based)
    // Connection string is set in environment or hardcoded here
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://ayush1si22ad005_db_user:PzPi6Z6NTORSBX81@cluster0.pudlycd.mongodb.net/quiz-platform?retryWrites=true&w=majority';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB Connected Successfully');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    console.error('Make sure your connection string is correct in config/database.js');
    // Exit process if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
