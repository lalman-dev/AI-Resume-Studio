# 🚀 AI Resume Studio App

📖 Overview

AI Resume Studio is a full-stack resume builder that represents my first serious attempt at backend and full-stack development.

Coming from a frontend background, this project was intentionally ambitious. I broke things, fixed them, broke them again, and gradually learned how real backend systems behave through hands-on debugging and iteration.

This repository is not just a finished product — it is a record of learning through failure, persistence, and incremental improvement.

🔗 [![Live Demo](https://img.shields.io/badge/Live%20Demo-ai--resume--studio-success?logo=vercel)](https://ai-resume-studio-snowy.vercel.app/)

---

🎯 Project Intent

The goal of this project was to move beyond frontend-only work and understand:

- How frontend and backend communicate

- How authentication works in real applications

- How databases persist data

- How file uploads and external services behave

- Why things break when contracts are mismatched

Many things went wrong during development — and that is exactly where most of the learning happened.

--

- ![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38BDF8?logo=tailwindcss)
- ![Framer Motion](https://img.shields.io/badge/FramerMotion-12.23.26-ff69b4?logo=framer)
- ![Redux Toolkit](https://img.shields.io/badge/ReduxToolkit-2.11.2-purple?logo=redux)
- ![React Router](https://img.shields.io/badge/ReactRouter-7.10.1-orange?logo=react-router)
- ![Lucide React](https://img.shields.io/badge/LucideReact-0.560.0-lightgrey)
- ![React Hot Toast](https://img.shields.io/badge/ReactHotToast-2.6.0-yellow)
- ![Axios](https://img.shields.io/badge/Axios-1.13.2-lightblue?logo=axios)
- ![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)
- ![Express](https://img.shields.io/badge/Express-5.2.1-black?logo=express)
- ![MongoDB](https://img.shields.io/badge/MongoDB-9.0.2-47A248?logo=mongodb)
- ![Multer](https://img.shields.io/badge/Multer-2.0.2-orange)
- ![ImageKit](https://img.shields.io/badge/ImageKit-Upload-orange)
- ![OpenAI](https://img.shields.io/badge/OpenAI-API-black?logo=openai)
- ![JWT](https://img.shields.io/badge/JWT-9.0.3-blue?logo=jsonwebtokens)
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-6.0.0-lightgrey)
- ![Dotenv](https://img.shields.io/badge/Dotenv-17.2.3-green)

---

## 🛠 Tech Stack

### 🖥️ Frontend

- **React 19 + TypeScript** — modern component architecture with type safety
- **TailwindCSS 4** — utility-first styling for responsive design
- **Framer Motion** — smooth animations and transitions
- **Redux Toolkit** — global state management
- **React Router v7** — dynamic routing
- **Lucide React** — clean, scalable icons
- **React Hot Toast** — elegant notifications
- **Axios** — HTTP client for API communication

### 🌐 Backend (First-Time)

- **Node.js + Express** — RESTful API server
- **MongoDB + Mongoose** — document database with schema modeling
- **JWT + Bcrypt** — secure authentication and password hashing
- **Multer** — file upload middleware
- **ImageKit** — image hosting and transformation
- **OpenAI API** — AI-powered resume enhancement
- **Dotenv** — environment variable management
  ⚠️ This was my first backend project, and many of these tools were new to me at the time.

---

## ✨ Features

- 📝 Resume builder with editable sections

- 🤖 AI-assisted enhancement for summaries and job descriptions

- 🔐 JWT-based authentication

- 💾 Resume persistence with MongoDB

- 🎨 Responsive UI with animations

- 📸 Profile image upload (⚠️ partially implemented — see notes below)

---

## 📚 What I Learned (Honest Reflection)

This project taught me far more through what broke than what worked immediately.

**Key Lessons**

- Frontend–Backend Contracts Matter
  Small mismatches in routes, payload shapes, or headers can break entire flows without obvious errors.

- Authentication Is Fragile When Misunderstood
  I initially broke authorization multiple times by overriding headers incorrectly before fixing it with a global interceptor.

- Debugging Is a Skill, Not Guesswork
  I learned to stop guessing and instead trace issues through logs, request payloads, middleware, and database state.

- Redux & Global State
  This was my first time using Redux Toolkit in a real project. I learned how global auth and resume state interact across pages.

- MongoDB & Mongoose Basics
  I learned schema design, CRUD operations, and how updates can silently fail if queries are incorrect.

- AI Integration
  Working with OpenAI taught me how prompt structure, API responses, and backend routing all need to align.

---

⚠️ Known Limitations (Intentional Transparency)

📸 **Image Upload Handling** (Partially Implemented)

Image upload was the hardest part of this project.

Despite multiple attempts:

- I successfully preview images on the frontend

- I integrated Multer and ImageKit on the backend

- I handled multipart/form-data and transformations

However, due to my beginner-level backend experience at the time, I could not fully stabilize the image upload + save flow without introducing regressions elsewhere.

Instead of hiding this:

- I documented it

- I preserved the learning

- I chose stability over incomplete complexity

This is an area I plan to revisit as my backend skills mature.

---

## 🐞 Bugs I Fixed (Learning Through Debugging)

This project involved extensive real-world debugging. Many issues were not obvious at first and required careful tracing of frontend–backend communication, middleware behavior, and request lifecycles. Below are some of the most important bugs I encountered and fixed while building this application.

### 🔐 Authorization Not Working After Login

Users could log in successfully, but protected routes kept returning 401 Unauthorized.

**Root cause:**
Authorization headers were inconsistently attached. Some requests overrode headers manually while others relied on defaults.

**Fix:**

- Implemented a global Axios interceptor to attach the JWT token

- Removed manual Authorization headers from individual API calls

- Ensured consistent Bearer <token> formatting

**What I Learned:**
Authentication issues often come from small inconsistencies rather than broken logic.

---

### 📝 Resume Rename Not Persisting

**Problem:**
Renaming a resume appeared to work in the UI but reverted after refresh.

**Root Cause:**

- Frontend route mismatch (/resume vs /resumes)

- Backend update logic didn’t persist the title correctly

- Update requests silently failed due to payload mismatch

**Fix:**

- Aligned frontend routes with backend routes

- Corrected update payload structure

- Ensured resume title updates were saved in MongoDB

**What I Learned:**
UI updates can be misleading if backend persistence fails silently.

---

### 🤖 AI Job Description Enhancement Failing

**Problem:\***
AI summary enhancement worked, but AI job description enhancement always failed.

**Root Cause:**

- Frontend called a non-existent backend endpoint

- Response key mismatch between backend and frontend

- Authorization headers were accidentally overridden

**Fix:**

- Corrected API endpoint paths

- Unified response formats

- Removed conflicting headers

**What I Learned:**
Frontend–backend contracts must match exactly; even small naming differences can break features completely.

---

### 🔄 Multer + JSON Payload Conflict

**Problem:**
Update requests randomly failed with 400 errors when saving resume data.

**Root Cause:**
multer middleware expected multipart/form-data, but some requests were sent as JSON, causing request bodies to be empty.

**Fix:**

- Separated text updates from file upload logic

- Ensured multipart requests were only used when files were present

**What I Learned:**
Middleware order and request formats matter more than expected, especially with file uploads.

---

### 📸 Image Upload (Partially Resolved)

**Problem:**
Profile image preview worked on the frontend, but saving images consistently failed.

**What Worked:**

- Image preview in React

- Multer file detection

- ImageKit integration

**What Didn’t Fully Stabilize:**

- Coordinating multipart requests with complex resume updates

- Preventing regressions while fixing image handling

**Decision:**
Rather than hiding the issue, I documented it and prioritized overall application stability.

**What I Learned:**
Knowing when to pause a feature is as important as knowing how to implement it.

🧠 Key Takeaway

Most of these bugs were not caused by lack of syntax knowledge, but by:

- Misaligned assumptions between frontend and backend

- Middleware behavior I hadn’t encountered before

- Silent failures without clear error messages

Fixing them taught me how real applications break and how engineers debug them systematically rather than guessing.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 📦 Prerequisites

- **Node.js v18+** installed
- **npm** or **yarn** package manager
- **MongoDB** running locally or on a cloud service (e.g., MongoDB Atlas)
- **OpenAI API key** (for AI enhancement features)
- **ImageKit account credentials** (for image upload and transformation)

---

### 🔧 Installation

1. **Clone the repository**

```bash
  git clone https://github.com/lalman-dev/AI-Resume-Studio.git
  cd Ai-Resume-Studio
```

2. Install dependencies for frontend

```bash
cd client
npm install
npm run dev
```

This runs the React + Vite frontend on http://localhost:5173 (default Vite port).

3. Install dependencies for backend

Open new terminal

```bash
cd server
npm install
npm run server
```

This runs the Express server with Nodemon on http://localhost:3000

⚙️ Environment Setup

Create a .env file inside the server folder with the following variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

🧪 Verify Setup

Open the frontend in your browser:👉 http://localhost:5173

Register or log in to create a resume.

Test features:

Add/edit resume sections

Upload a profile image

Toggle private/public visibility

Use AI enhancement for summary and job descriptions

📌 Notes

The backend must be running before the frontend can connect.

Ensure MongoDB is accessible (local or cloud).

AI features require a valid OpenAI API key.

Image upload requires valid ImageKit credentials.

---

🧪 What Works Reliably

- Authentication & protected routes

- Resume creation, editing, deletion

- AI summary enhancement

- AI job description enhancement

- Frontend routing and state management

---

📌 Future Improvements

✅ Add testing with Jest/React Testing Library

✅ Rebuild image upload flow with clearer separation of concerns

✅ Multi‑language support

✅ Collaborative editing

## 🏆 Conclusion

This project is not perfect — and that’s intentional.

It represents:

- My first backend experience

- Real mistakes and real fixes

- Learning through failure rather than tutorials

- Growth from frontend-only thinking to full-stack awareness

AI Resume Studio is less about showing a flawless product and more about showing how I learn, debug, and improve when things break — which is how real engineering happens.
