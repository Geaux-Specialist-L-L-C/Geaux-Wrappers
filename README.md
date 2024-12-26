
# Content Automation Project

This project provides a full-stack solution for automated content generation using GPT, including a React frontend and a FastAPI backend.

## Features
- User authentication with JWT
- Content generation for blogs, scripts, and summaries
- User-specific content saving and history
- Analytics dashboard

## Project Structure
- `backend/`: Contains FastAPI backend code
- `frontend/`: Contains React frontend code

## Setup Instructions

### Backend
1. Navigate to `backend/`.
2. Install dependencies: `pip install -r requirements.txt`
3. Start the server: `uvicorn app.main:app --reload`.

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## Deployment
Both frontend and backend are Dockerized for easy deployment. Use the included Dockerfiles to build and run containers.

