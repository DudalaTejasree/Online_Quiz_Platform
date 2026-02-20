#!/bin/bash
# QUICK START GUIDE FOR QUIZ PLATFORM

echo "======================================"
echo "Quiz Platform - Quick Start Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed"
    echo "Please download from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "✗ npm is not installed"
    exit 1
fi

echo "✓ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "======================================"
echo "Installation Complete!"
echo "======================================"
echo ""
echo "Next Steps:"
echo "1. Start MongoDB: mongod"
echo "2. In another terminal, run: npm start"
echo "3. Open http://localhost:3000"
echo ""
echo "======================================"
