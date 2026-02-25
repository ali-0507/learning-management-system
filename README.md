# Learning Management System (LMS)
## Overview
This is a minimal Learning Management System that allow instructors to create and manage courses, while students can enroll in courses, complete lessons, and track their learning progress in real time.
The system is designed with proper authentication, role-based access control, and accurate progress tracking.

## Project Live Link :
https://learning-management-system-olive-rho.vercel.app/

## Live Deployment:
### Frontend: https://learning-management-system-olive-rho.vercel.app/
### Backend: https://learning-management-system-backend-y7df.onrender.com/

## Tech Stack
### Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router
### Backend:
- Node.js
- Express.js
- JWT Authentication
- Role-based Authorization
### Database:
- MongoDB Atlas
### Deployment:
- Frontend: Vercel
- Backend: Render

## Features
### Instructor
- Create courses
- Add video or text lessons
- View enrolled students' progress
- Dashboard to manage courses
### Student
- Browse/Explore available courses
- Enroll in courses
- View lessons
- Mark lesson as complete
- Track course completion percentage
### Progress System 
- Accurate lesson completion tracking
- Duplicate completion prevention
- Course-level percentage calculation
- Instructor-level progress visibility
### Authentication & Security
- JWT-based authentication
- Role-based middleware (Student/Instructor)
- Protected routes on both frontend and backend
- Secure CORS configuration
- Persistent login on refresh
### API Documentation
The Github repository includes a Postman Collection containing all API endpoints:
- Authentication
- Courses
- Lessons
- Enrollment
- Progress
- Dashboards
### Project Structure
#### Backend:
- Controllers
- Routes
- Middlewares (Auth + Role)
- Models
- Config
- app.js
- server.js
#### Frontend:
- Components (Navbar, ProtectedRoute, Course card, Lesson list)
- Pages (Student, Instructor, Login, Register)
- Context API (Auth management)
- Axios API configuration

## Requirement Coverage
- Course creation workflow ✔️
- Lesson creation workflow ✔️
- Enrollment system ✔️
- Completion tracking ✔️
- Instructor Dashboard ✔️
- Student Dashboard ✔️
- Deployment ✔️
- API Documentation (Postman Collection) ✔️

## Author
Ali Raza
Full Stack (MERN) Developer



