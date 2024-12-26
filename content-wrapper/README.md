
# Content Automation Project

This project is a full-stack solution for automated content generation, including a React frontend and a FastAPI backend.

## Features
- Backend: FastAPI handles API requests and connects to OpenAI's GPT for content generation.
- Frontend: React-based interface for user interactions.
- Dockerized for easy deployment.

## Project Structure
- `backend/`: Contains FastAPI backend code.
- `frontend/`: Contains React frontend code.

## Setup Instructions

### Backend
1. Navigate to `backend/`.
2. Install dependencies: `pip install -r requirements.txt`
3. Start the server: `uvicorn app:app --reload`.

### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## Deployment
- Use Dockerfiles provided in both `backend` and `frontend` folders for deployment.
