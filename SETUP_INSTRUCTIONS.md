# HOW TO RUN THE PROJECT - STEP BY STEP

## ✅ PREREQUISITES CHECK

Before starting, ensure you have:

1. **Node.js** installed
   - Download: https://nodejs.org/ (LTS version recommended)
   - Verify: Open terminal and run: `node --version`

2. **MongoDB** installed locally
   - Download: https://www.mongodb.com/try/download/community
   - Windows: Install MongoDB Community Service
   - Mac: `brew tap mongodb/brew` then `brew install mongodb-community`
   - Linux: Follow official MongoDB documentation

3. **npm** (usually comes with Node.js)
   - Verify: Open terminal and run: `npm --version`

---

## 🚀 INSTALLATION & SETUP

### Step 1: Navigate to Project Directory

Open your terminal/PowerShell and go to the project folder:

```bash
cd "C:\Users\Ayush Prabhat\Desktop\CHIAC_Project\quiz-platform"
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

Expected output:
```
added 150+ packages
```

This installs:
- express (web framework)
- mongoose (MongoDB connection)
- ejs (template engine)
- nodemon (auto-reload for development)

### Step 3: Start MongoDB

**IMPORTANT: MongoDB must be running before starting the Express server**

#### Option A: Windows (if installed as service)
```bash
# MongoDB should start automatically
# Or start it manually using MongoDB Compass or
net start MongoDB
```

#### Option B: Windows (manual)
Open a new terminal and run:
```bash
mongod
```

You should see output like:
```
[initandlisten] waiting for connections on port 27017
```

#### Option C: Mac/Linux
```bash
brew services start mongodb-community
# or
mongod
```

**Keep this terminal open while running the project**

### Step 4: Start the Express Server

In the original terminal (NOT the MongoDB terminal), run:

```bash
# Development mode (auto-reload on file changes)
npm run dev

# OR regular mode
npm start
```

Expected output:
```
✓ MongoDB Connected Successfully
✓ Server is running on http://localhost:3000
✓ Open your browser and go to http://localhost:3000
```

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

You should see the home page with three buttons:
- ✏️ Create a New Quiz
- 📝 Attempt a Quiz
- 📊 View My Past Attempts

---

## 📝 TESTING THE APPLICATION

### Test 1: Create a Quiz

1. Click "✏️ Create a New Quiz"
2. Enter Quiz Title: "Sample Quiz"
3. Set Number of Questions: 3
4. Click "Generate Question Fields"
5. Fill in the questions:

**Question 1:**
- Question: "What is 2 + 2?"
- Option A: "3"
- Option B: "4" ✓ (select as correct)
- Option C: "5"
- Option D: "6"

**Question 2:**
- Question: "Which is the largest planet?"
- Option A: "Mars"
- Option B: "Earth"
- Option C: "Jupiter" ✓
- Option D: "Saturn"

**Question 3:**
- Question: "What is the capital of France?"
- Option A: "Lyon"
- Option B: "Paris" ✓
- Option C: "Marseille"
- Option D: "Nice"

6. Click "💾 Create Quiz"
7. You should be redirected to "Available Quizzes" page with your new quiz listed

### Test 2: Attempt a Quiz

1. Click "📝 Attempt a Quiz"
2. You should see "Sample Quiz" in the list
3. Click "▶️ Attempt This Quiz"
4. Enter your name (e.g., "John Doe")
5. Answer the questions:
   - Select "4" for Question 1
   - Select "Jupiter" for Question 2
   - Select "Paris" for Question 3
6. Click "✓ Submit Quiz"
7. You should see your result:
   - Score: 3/3
   - Percentage: 100%
   - ✓ Congratulations! You passed the quiz

### Test 3: Try Again With Wrong Answers

1. Go back to "📝 Attempt a Quiz"
2. Attempt the same quiz again
3. Enter name (e.g., "Jane Smith")
4. Answer incorrectly:
   - Select "3" for Question 1
   - Select "Saturn" for Question 2
   - Select "Lyon" for Question 3
5. Submit
6. You should see:
   - Score: 0/3
   - Percentage: 0%
   - ✗ You did not pass the quiz

### Test 4: View Past Attempts

1. Click "📊 View My Past Attempts"
2. Enter name: "John Doe"
3. Click "🔍 Search Attempts"
4. You should see a table with all of John Doe's attempts:
   - Quiz Name: Sample Quiz
   - Score: 3/3
   - Percentage: 100%
   - Result: Pass

5. Try searching for "Jane Smith" to see her attempt:
   - Score: 0/3
   - Percentage: 0%
   - Result: Fail

---

## 🛑 TROUBLESHOOTING

### Issue: "Cannot find module 'express'"

**Solution:**
Run `npm install` again in the project directory

```bash
npm install
```

---

### Issue: "connect ECONNREFUSED 127.0.0.1:27017"

**Problem:** MongoDB is not running

**Solution:**
1. Open a new terminal
2. Run: `mongod` (on Windows/Mac/Linux)
3. Keep it running
4. Then start the Express server in another terminal

Windows MongoDB Service:
```bash
# Start MongoDB service
net start MongoDB

# Or use MongoDB Compass GUI
```

---

### Issue: "Port 3000 is already in use"

**Solution 1:** Kill the process using port 3000

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Mac/Linux:
```bash
lsof -i :3000
kill -9 <PID>
```

**Solution 2:** Change port in `app.js`
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

---

### Issue: "Page not found" when accessing routes

**Problem:** Server not running or routes not registered

**Solution:**
1. Check if terminal shows "Server is running on http://localhost:3000"
2. Check if "MongoDB Connected Successfully" message appears
3. Restart the server: Press Ctrl+C and run `npm start` again

---

### Issue: MongoDB connection error

**Solution:**
1. Ensure MongoDB is running: `mongod`
2. Check if port 27017 is available
3. In `config/database.js`, try changing:
   ```javascript
   'mongodb://localhost:27017/quiz-platform'
   // to
   'mongodb://127.0.0.1:27017/quiz-platform'
   ```

---

## 🔧 DEVELOPMENT TIPS

### Hot Reload During Development

Run in development mode:
```bash
npm run dev
```

This uses nodemon to auto-restart the server when files change.

### View MongoDB Data

Use MongoDB Compass (GUI):
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Select `quiz-platform` database
4. View `quizzes` and `attempts` collections

Or use MongoDB Shell:
```bash
mongo
use quiz-platform
db.quizzes.find()
db.attempts.find()
```

### Check Server Logs

All console logs appear in the terminal where you ran `npm start`

Examples:
```
✓ MongoDB Connected Successfully
✓ Server is running on http://localhost:3000
Error creating quiz: [...error details...]
```

---

## 📋 STARTUP CHECKLIST

Before saying "it's ready":

- [ ] MongoDB is running (check for port 27017 connection)
- [ ] `npm install` completed without errors
- [ ] Terminal shows "✓ MongoDB Connected Successfully"
- [ ] Terminal shows "✓ Server is running on http://localhost:3000"
- [ ] Browser can access http://localhost:3000
- [ ] Home page loads with 3 buttons
- [ ] Can create a quiz
- [ ] Can view quizzes
- [ ] Can attempt a quiz
- [ ] Can see scores
- [ ] Can view attempt history

---

## 🎯 QUICK COMMANDS REFERENCE

```bash
# Install dependencies
npm install

# Start in development mode (with auto-reload)
npm run dev

# Start in normal mode
npm start

# (In separate terminal) Start MongoDB
mongod

# Stop the server
Ctrl + C

# Install a new package
npm install package-name

# View installed packages
npm list
```

---

## 📱 ACCESSING FROM OTHER DEVICES

After starting the server, you can access it from:

**Same Computer:**
- http://localhost:3000
- http://127.0.0.1:3000

**Other Devices on Network:**
1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4 Address like 192.168.x.x)
   - Mac/Linux: `ifconfig`

2. Access from other device:
   - http://YOUR_IP_ADDRESS:3000
   - Example: http://192.168.1.100:3000

---

## ⏸️ STOPPING THE APPLICATION

To stop the Express server:
- Press `Ctrl + C` in the terminal running the server

To stop MongoDB:
- Press `Ctrl + C` in the terminal running mongod
- Or: `net stop MongoDB` (Windows)

---

## 🎓 DEPLOYMENT (For Later)

When deploying to production:

1. **Change MongoDB Connection:**
   - Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Update connection string in `config/database.js`

2. **Set Environment Variables:**
   - Create `.env` file
   - Store sensitive data like DB password

3. **Install Production Dependencies:**
   - Only install required packages
   - Remove nodemon (dev-only)

4. **Set NODE_ENV:**
   ```bash
   export NODE_ENV=production  # Mac/Linux
   set NODE_ENV=production     # Windows
   ```

---

**Now you're ready to run the Quiz Platform! 🚀**

If you encounter any issues, check the troubleshooting section above.
