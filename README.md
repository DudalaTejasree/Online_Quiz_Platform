# Online Quiz & Assessment Platform

A simple quiz management system built with Node.js, Express.js, MongoDB, and EJS.

## Project Structure

```
quiz-platform/
├── config/
│   └── database.js           # MongoDB connection setup
├── models/
│   ├── Quiz.js              # Quiz schema (questions, options, answers)
│   └── Attempt.js           # Attempt schema (user scores and records)
├── routes/
│   └── quizRoutes.js        # All application routes
├── views/
│   ├── index.ejs            # Home page
│   ├── create.ejs           # Create quiz form
│   ├── quizzes.ejs          # List all quizzes
│   ├── quiz.ejs             # Attempt quiz page
│   ├── result.ejs           # Score result page
│   ├── attempts.ejs         # Username search form
│   └── attemptHistory.ejs   # View past attempts
├── public/
│   └── css/
│       └── style.css        # CSS styling
├── app.js                   # Main Express application
├── package.json             # Dependencies configuration
└── README.md               # This file
```

## Features

✓ Create quizzes with multiple choice questions  
✓ Attempt quizzes with instant scoring  
✓ View quiz history by username  
✓ Automatic score calculation on backend  
✓ Simple and clean user interface  
✓ No authentication needed (just username input)  

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine with HTML & CSS
- **Database ODM**: Mongoose (for schema validation)

## Prerequisites

Before running the project, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (running locally) - [Download](https://www.mongodb.com/try/download/community)
3. **npm** (comes with Node.js)

## Installation Steps

### Step 1: Install Dependencies

Navigate to the project directory and install required npm packages:

```bash
cd quiz-platform
npm install
```

This will install:
- express (Web framework)
- mongoose (MongoDB ODM)
- ejs (Template engine)

### Step 2: Start MongoDB

Make sure MongoDB is running on your local machine. Open a terminal and run:

```bash
# For Windows
mongod

# For Mac/Linux
brew services start mongodb-community
# or
mongod
```

MongoDB will start on `mongodb://localhost:27017`

## Running the Project

### Development Mode (with auto-reload)

```bash
npm run dev
```

This requires nodemon. If you haven't installed it globally, it's included as a dev dependency.

### Regular Mode

```bash
npm start
```

The server will start at `http://localhost:3000`

## Expected Output

When the server starts successfully, you should see:

```
✓ MongoDB Connected Successfully
✓ Server is running on http://localhost:3000
✓ Open your browser and go to http://localhost:3000
```

## How to Use

### 1. Create a Quiz

- Click "✏️ Create a New Quiz" on the home page
- Enter quiz title (e.g., "JavaScript Basics")
- Select number of questions
- Click "Generate Question Fields"
- Fill in each question:
  - Question text
  - 4 options (A, B, C, D)
  - Select the correct answer
- Click "💾 Create Quiz"

### 2. Attempt a Quiz

- Click "📝 Attempt a Quiz" on the home page
- Select a quiz from the list
- Enter your name/roll number
- Answer all questions
- Click "✓ Submit Quiz"
- See instant results with score and percentage

### 3. View Past Attempts

- Click "📊 View My Past Attempts"
- Enter your username
- See all your previous quiz attempts with:
  - Quiz name
  - Score obtained
  - Percentage
  - Date of attempt
  - Pass/Fail status

## Database Schema

### Quiz Schema

```javascript
{
  title: String,
  questions: [
    {
      questionText: String,
      options: [String, String, String, String],  // 4 options
      correctAnswer: Number (0-3)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Attempt Schema

```javascript
{
  username: String,
  quizId: ObjectId (Reference to Quiz),
  score: Number,
  totalQuestions: Number,
  date: Date
}
```

## Routes Overview

| Route | Method | Purpose |
|-------|--------|---------|
| `/` | GET | Home page |
| `/create` | GET | Show quiz creation form |
| `/create` | POST | Save quiz to database |
| `/quizzes` | GET | List all quizzes |
| `/quiz/:id` | GET | Display quiz for attempting |
| `/submit/:id` | POST | Submit answers and calculate score |
| `/attempts` | GET | Show username search form |
| `/attempts` | POST | Show past attempts for user |

## Key Features Explained

### 1. Score Calculation

- **Location**: Backend (`routes/quizRoutes.js`)
- **Security**: User cannot manipulate scores
- **Logic**: Compares user answers with correct answers stored in database
- **Calculation**: `percentage = (score / totalQuestions) * 100`

### 2. No Authentication

- No login system required
- Users enter their name/username when attempting quiz
- All attempts are recorded with username
- Can view ownhistory by entering username again

### 3. Database Validation

- Mongoose validates that each question has exactly 4 options
- Correct answer index must be 0-3
- Username and quiz responses are required

## Customization

### Change MongoDB Connection

Edit `config/database.js`:

```javascript
// Change this line if using MongoDB Atlas or remote server
await mongoose.connect('mongodb://localhost:27017/quiz-platform');
```

### Change Server Port

Edit `app.js`:

```javascript
const PORT = process.env.PORT || 3000;  // Change 3000 to desired port
```

### Modify CSS Styling

Edit `public/css/style.css` for visual changes

### Add More Fields to Quiz

Edit `models/Quiz.js` and add new fields to the schema

## Troubleshooting

**Issue: MongoDB Connection Error**
- Solution: Ensure MongoDB is running (`mongod` command in terminal)
- Check if port 27017 is available
- Try: `mongodb://127.0.0.1:27017` if `localhost` doesn't work

**Issue: Port 3000 Already in Use**
- Solution: Change PORT in `app.js` or kill process using port 3000
- Windows: `netstat -ano | findstr :3000`

**Issue: nodemon not found**
- Solution: Run `npm install` again or use `npm start` instead of `npm run dev`

**Issue: EJS Template Not Found**
- Solution: Ensure all `.ejs` files are in the `views` folder
- Check view engine path in `app.js`

## Sample Quiz Data

Try creating a sample quiz:

**Title**: JavaScript Basics

**Questions**:
1. What does JS stand for?
   - A) Java Script ✓
   - B) Just Something
   - C) Java Source
   - D) Java System

2. Which is not a primitive data type?
   - A) String
   - B) Number
   - C) Array ✓
   - D) Boolean

## Development Notes

- This is a simple project suitable for student internship/portfolio
- No complex architecture or patterns
- Straightforward MVC folder structure
- Basic error handling implemented
- Comments added throughout code

## Future Enhancements (Optional)

- Add user authentication with password
- Add quiz difficulty levels
- Add time limit for quizzes
- Add edit/delete quiz functionality
- Add detailed analytics dashboard
- Add shuffle questions feature
- Add image support in questions

## License

This project is open source and available for educational purposes.

## Support

For issues or questions:
1. Check MongoDB is running
2. Verify all dependencies are installed
3. Check console for error messages
4. Ensure port 3000 is available

---

**Built with ❤️ for learning purposes**
