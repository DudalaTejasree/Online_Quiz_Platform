# How to Run the Quiz Platform

## Prerequisites

1. **Node.js** - Download from https://nodejs.org/ (v14+)
2. **MongoDB** - Either:
   - Local instance: Download from https://www.mongodb.com/try/download/community
   - OR Atlas (Cloud): Create a free cluster at https://www.mongodb.com/cloud/atlas

## Quick Start

### 1. Install Dependencies
```bash
cd quiz-platform
npm install
```

### 2. Start MongoDB (if using local)
If you installed MongoDB locally, start it:

**Windows (Command Prompt or PowerShell):**
```bash
mongod
```

The server will listen on `mongodb://127.0.0.1:27017` by default.

### 3. Start the App

**Development mode** (with auto-reload via nodemon):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on **http://localhost:3000**

### 4. Open in Browser
Navigate to: **http://localhost:3000**

## Features

- ✏️ Create quizzes with multiple choice questions
- 📝 Attempt quizzes and get instant results
- 📊 View past quiz attempts and scores
- Automatic score calculation

## MongoDB Connection

If you want to use **MongoDB Atlas** (cloud):
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Whitelist your IP address in the Atlas security settings
3. Set the environment variable:

```bash
# Windows PowerShell
$env:MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/quiz-platform"
npm run dev
```

Or add it to a `.env` file (requires `dotenv` package).

## Troubleshooting

**Error: "Could not connect to MongoDB"**
- Make sure MongoDB is running (`mongod` process)
- Check that port 27017 is not blocked
- If using Atlas, verify IP is whitelisted

**Error: "Port 3000 already in use"**
- Kill the process using port 3000 or change the PORT variable:
```bash
$env:PORT=3001
npm run dev
```

## Project Structure

```
quiz-platform/
├── app.js                 # Main Express app
├── config/database.js     # MongoDB connection
├── models/
│   ├── Quiz.js           # Quiz schema
│   ├── Attempt.js        # Attempt schema
├── routes/quizRoutes.js  # API routes
├── views/                # EJS templates
└── public/css/           # Stylesheets
```

## Next Steps

1. Open http://localhost:3000
2. Create a new quiz
3. Attempt a quiz
4. View your results
