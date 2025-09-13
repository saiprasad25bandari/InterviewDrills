<<<<<<< HEAD
# InterviewDrills
=======
**Interview Drills MERN App**

A Mini Interview Drills web application built with the MERN stack, allowing users to take coding drills, track history, and authenticate via Google SSO. Includes backend APIs, frontend interface, Docker setup, and load testing with k6.

**Tech Stack**

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT + Google OAuth

Containerization: Docker & Docker Compose

Load Testing: k6

**Features**

Google SSO login

Dashboard displaying available drills

Take coding drills and submit answers

Track all drill attempts in user history

REST API endpoints for drills and user data

Load testing with k6


**Project Structure**

InterviewDrill/
├─ backend/ # Express backend
│ ├─ src/routes/
│ ├─ src/models/
│ ├─ ...
├─ frontend/ # React frontend
│ ├─ src/pages/
│ ├─ src/components
│ ├─ ...
├─ k6/ # Load testing scripts
│ └─ script.js
├─ docker-compose.yml
├─ .env
└─ README.md


**Running Locally**

**Backend**
cd backend
npm install
npm run dev

Backend runs on: http://localhost:4000


**Frontend**
cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173


**Using Docker**

Build and run both frontend & backend:

docker-compose up --build


 **API Endpoints***
Route	       Method	Description
/api/health	    GET 	Check server health
/api/drills 	GET	    Get all drills
/api/drills/:id	GET 	Get details of a drill by ID
/auth/google	GET 	Google SSO login

**Load Testing with k6**

Make sure backend is running, then run:
k6 run k6/scripts.js

**Final Notes**

Ensure MongoDB Atlas connection string is correct.

Use npm run dev for backend development mode.

Use Docker Compose for containerized setup.

k6 script tests endpoints and gives HTTP request stats.


**Author**

Saketh Chakilam

Mini Interview Drills App - Full MERN Stack Project
>>>>>>> 95488e0 (finished interview_drills project)
