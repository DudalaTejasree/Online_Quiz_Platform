# PROJECT STRUCTURE & FILES OVERVIEW

## 📁 Complete Folder Structure

```
quiz-platform/
│
├── 📂 config/
│   └── database.js                 # MongoDB connection configuration
│
├── 📂 models/
│   ├── Quiz.js                     # Quiz data model (with questions & answers)
│   └── Attempt.js                  # Attempt record model (user scores)
│
├── 📂 routes/
│   └── quizRoutes.js               # All API routes and business logic
│
├── 📂 views/ (EJS Templates - HTML)
│   ├── index.ejs                   # Home page
│   ├── create.ejs                  # Create quiz form
│   ├── quizzes.ejs                 # List all quizzes
│   ├── quiz.ejs                    # Attempt quiz page
│   ├── result.ejs                  # Show score and result
│   ├── attempts.ejs                # Search past attempts
│   └── attemptHistory.ejs          # Display past attempts table
│
├── 📂 public/
│   └── 📂 css/
│       └── style.css               # All styling (responsive & minimal)
│
├── app.js                          # Main Express application
├── package.json                    # Dependencies & scripts
├── README.md                       # Full documentation
├── QUICK_START.sh                  # Quick installation script
└── .gitignore                      # Git ignore rules
```

---

## 📄 FILE DESCRIPTIONS

### Core Application Files

#### `app.js` (Main Server)
- Initializes Express server on port 3000
- Connects to MongoDB database
- Sets up EJS as templating engine
- Defines middleware (static files, JSON parsing)
- Mounts all routes
- Error handling for 404 pages

#### `package.json` (Dependencies)
```json
Dependencies:
- express: Web framework
- mongoose: MongoDB ODM
- ejs: Template engine

Dev Dependencies:
- nodemon: Auto-reload during development
```

---

### Database Layer

#### `config/database.js`
- Mongoose connection to MongoDB
- Connection string: `mongodb://localhost:27017/quiz-platform`
- Error handling if MongoDB is not available
- Exports connection function

#### `models/Quiz.js`
```
Schema:
├── title (String, required)
├── questions (Array)
│   ├── questionText (String)
│   ├── options (Array of 4 strings)
│   └── correctAnswer (Number: 0-3)
├── createdAt (Auto)
└── updatedAt (Auto)
```

#### `models/Attempt.js`
```
Schema:
├── username (String)
├── quizId (ObjectId reference)
├── score (Number)
├── totalQuestions (Number)
└── date (Date)
```

---

### Routes & Logic

#### `routes/quizRoutes.js`
All business logic & route handlers:

```
GET  /                    → Display home page
GET  /create              → Show quiz creation form
POST /create              → Save quiz to database
GET  /quizzes             → List all quizzes
GET  /quiz/:id            → Display quiz for attempt
POST /submit/:id          → Calculate score & save attempt
GET  /attempts            → Username search form
POST /attempts            → Show past attempts for user
```

Key Features:
- ✓ Score calculated on backend (secure)
- ✓ All user input validated
- ✓ Quiz questions populated from database
- ✓ Attempt history saved with timestamps

---

### View Layer (EJS Templates)

#### `views/index.ejs` (Home Page)
- Three main action buttons
- Feature list
- Entry point to application

#### `views/create.ejs` (Quiz Creation)
- Text input for quiz title
- Number input for question count
- JavaScript to dynamically generate question fields
- Form submission to POST /create

#### `views/quizzes.ejs` (Quiz List)
- Displays all created quizzes
- Shows question count and creation date
- Links to each quiz for attempting
- Handles empty state

#### `views/quiz.ejs` (Attempt Quiz)
- Username input field
- Displays all questions with 4 radio button options
- Client-side validation (all questions must be answered)
- Submit button to POST /submit/:id
- Includes JavaScript validation

#### `views/result.ejs` (Score Display)
- Shows score (e.g., 8/10)
- Displays percentage
- Pass/fail message based on 50% threshold
- Links to next actions

#### `views/attempts.ejs` (Search Page)
- Simple form to enter username
- Used to search past attempts

#### `views/attemptHistory.ejs` (Attempt Table)
- HTML table with columns:
  - Quiz Name
  - Score (e.g., 8/10)
  - Percentage
  - Date of attempt
  - Pass/Fail status
- Shows "no attempts" message if none found

---

### Styling

#### `public/css/style.css` (Complete Styling)

Includes:
```css
Global Styles:
- Font: Segoe UI (clean & simple)
- Colors: Blue (#3498db), Green (#27ae60), Red (#e74c3c)
- Background: Light gray (#f5f5f5)

Components:
- Containers (max-width: 800px, centered)
- Forms (labeled inputs with focus states)
- Buttons (multiple variants: primary, success, danger)
- Cards (quiz items, questions, results)
- Tables (attempt history display)
- Messages (success, error, info alerts)
- Responsive design for mobile

Class Names:
.container        - Main content wrapper
.btn, .btn-*      - Button variants
.quiz-item        - Quiz display card
.question-card    - Question wrapper
.option-label     - Radio button option
.result-card      - Result display
.attempt-table    - History table
.success/fail     - Result status messages
```

---

## 🔄 DATA FLOW

### Creating a Quiz
```
User → Fill Form → POST /create → Parse Questions → 
Save to MongoDB → Redirect to /quizzes
```

### Attempting a Quiz
```
User → Select Quiz → GET /quiz/:id → Display Questions → 
User Answers → POST /submit/:id → Calculate Score (Backend) → 
Save to MongoDB → Show Result
```

### Viewing History
```
User → Enter Username → POST /attempts → Query MongoDB → 
Display Table of Past Attempts
```

---

## 🔐 Security Features

1. **Score Calculation on Backend**
   - User cannot manipulate their score
   - Correct answers stored in database
   - Comparison done server-side only

2. **Input Validation**
   - All form fields required
   - Question count validated (1-50)
   - Answer options validated (must be 0-3)

3. **No Authentication**
   - As requested, simple username input
   - No passwords, no login system
   - Works on honor system for learning

---

## 📊 Database Operations

### Create Quiz
```javascript
Quiz.create({
  title: "...",
  questions: [...]
})
```

### Submit Answer & Save Score
```javascript
const attempt = Attempt.create({
  username: "...",
  quizId: "...",
  score: 8,
  totalQuestions: 10
})
```

### Fetch Attempt History
```javascript
Attempt.find({ username: "..." })
  .populate('quizId')
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying:
- [ ] MongoDB set up on server
- [ ] Node.js installed on server
- [ ] `npm install` run successfully
- [ ] Change MongoDB connection string (if using remote DB)
- [ ] Test all routes locally
- [ ] Verify score calculation works
- [ ] Check responsive design on mobile

---

## 📝 CODE COMMENTS

All files include:
- Section headers (==================)
- Function descriptions
- Parameter explanations
- Important logic comments
- Inline comments for complex code

This makes it easy for internship projects to be understood by reviewers.

---

## 🎓 LEARNING OUTCOMES

This project teaches:
1. Node.js & Express.js fundamentals
2. MongoDB & Mongoose schema design
3. MVC folder structure
4. EJS templating & dynamic HTML rendering
5. Form handling & validation
6. Database operations (CRUD)
7. Score calculation & backend logic
8. Basic CSS & responsive design

---

## 📱 RESPONSIVE DESIGN

The CSS includes media queries for:
- Desktop screens (800px+)
- Mobile/Tablet screens (<600px)

Elements that adapt:
- Container padding
- Font sizes
- Button sizes
- Table display

---

## ✅ PROJECT CHECKLIST

All requirements met:
- ✓ Node.js + Express.js
- ✓ MongoDB with Mongoose
- ✓ EJS templating engine
- ✓ Multiple choice questions (4 options)
- ✓ One correct answer per question
- ✓ Quiz creation feature
- ✓ Quiz attempt feature
- ✓ Score calculation on backend
- ✓ View past attempts by username
- ✓ No authentication system
- ✓ MVC folder structure
- ✓ Minimal & simple UI
- ✓ No React or frontend complexity
- ✓ Proper code comments

---

All files are ready to run. No additional setup files needed beyond what's provided.
