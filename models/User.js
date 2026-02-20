const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema Definition
const userSchema = new mongoose.Schema(
  {
    // User's full name
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    // User's email (unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    // User's password (hashed)
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Account creation timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Role of the user: student or teacher
    role: {
      type: String,
      enum: ['student', 'teacher'],
      default: 'student',
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return next();

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
