# 🚀 AI Resume Studio App


## 📖 Overview

A modern, full‑stack **Resume Builder** designed to help users craft professional resumes with ease.  
It combines **AI‑powered enhancements**, **image uploads**, and **real‑time editing** with a sleek UI built for recruiters and job seekers.


[![Live Demo](https://img.shields.io/badge/Live%20Demo-ai--resume--studio-success?logo=vercel)](https://ai-resume-studio-snowy.vercel.app/)

---

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/FramerMotion-12.23.26-ff69b4?logo=framer)
![Redux Toolkit](https://img.shields.io/badge/ReduxToolkit-2.11.2-purple?logo=redux)
![React Router](https://img.shields.io/badge/ReactRouter-7.10.1-orange?logo=react-router)
![Lucide React](https://img.shields.io/badge/LucideReact-0.560.0-lightgrey)
![React Hot Toast](https://img.shields.io/badge/ReactHotToast-2.6.0-yellow)
![Axios](https://img.shields.io/badge/Axios-1.13.2-lightblue?logo=axios)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0.2-47A248?logo=mongodb)
![Multer](https://img.shields.io/badge/Multer-2.0.2-orange)
![ImageKit](https://img.shields.io/badge/ImageKit-Upload-orange)
![OpenAI](https://img.shields.io/badge/OpenAI-API-black?logo=openai)
![JWT](https://img.shields.io/badge/JWT-9.0.3-blue?logo=jsonwebtokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-6.0.0-lightgrey)
![Dotenv](https://img.shields.io/badge/Dotenv-17.2.3-green)

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

### 🌐 Backend
- **Node.js + Express** — RESTful API server
- **MongoDB + Mongoose** — document database with schema modeling
- **JWT + Bcrypt** — secure authentication and password hashing
- **Multer** — file upload middleware
- **ImageKit** — image hosting and transformation
- **OpenAI API** — AI-powered resume enhancement
- **Dotenv** — environment variable management
- 
---

## ✨ Features

- 📝 **Dynamic Resume Sections**  
  Add, edit, and remove sections like Summary, Experience, Education, Projects, and Skills.

- 🤖 **AI Enhancement**

  - Professional summary polished into recruiter‑friendly text.
  - Job descriptions transformed into impactful bullet points with measurable achievements.

- 📸 **Image Upload**  
  Upload and transform profile images with background removal and face‑focused cropping.

- 🔄 **Private/Public Toggle**  
  Control resume visibility with a single click.

- 💾 **Autosave & Update**  
  Save resumes seamlessly with backend integration.

- 🎨 **Modern UI/UX**  
  Smooth animations, responsive design, and user‑friendly layouts.

---

## 📚 What I Learned

This project was my first hands-on introduction to backend development, databases, and global state management. I approached each challenge with curiosity and persistence, learning by building and debugging in real time.

- 🧠 **Redux Toolkit**: I’m new to Redux, but I used it here to manage authentication and resume data across components. I’m still exploring advanced patterns, but I now understand how slices, actions, and selectors work together.

- 🌐 **Backend APIs**: I built RESTful routes using Express and connected them to MongoDB. This was my first time handling authentication, file uploads, and protected routes. I learned how to structure controllers, use middleware, and manage request/response flows.

- 🍃 **MongoDB & Mongoose**: I explored schema design and CRUD operations. While I’m still learning query optimization and relationships, I now understand how to model data and interact with it through Mongoose.

- 🔐 **Authentication**: I implemented JWT-based login and protected routes. It was my first time working with tokens, headers, and middleware logic.

- 📦 **File Uploads**: I used Multer to handle image uploads and integrated ImageKit for hosting and transformation. This taught me how multipart/form-data works and how to process files server-side.

- 🤖 **OpenAI Integration**: I connected the OpenAI API to enhance resume content. It was my first experience working with external AI services and crafting prompts for meaningful output.

- 🧪 **Debugging & Iteration**: I learned how to troubleshoot broken flows, align frontend-backend payloads, and recover from unexpected errors. This project taught me the value of incremental fixes and clear logging.

---

I’m still early in my backend journey, but this project gave me a strong foundation to build on. I’m actively learning best practices and improving my understanding of fullstack development through real-world implementation.

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


📌 Future Improvements

✅ Add testing with Jest/React Testing Library

✅ Export resumes as PDF/Docx

✅ Multi‑language support

✅ Collaborative editing

## 🏆 Conclusion

This project represents my journey from a **frontend foundation** into my **introduction to backend and fullstack development**. By integrating AI services, image handling, and secure APIs, I’ve taken my first steps toward building end‑to‑end applications. It’s not just a resume builder — it’s a showcase of how I’m expanding beyond frontend into backend concepts, preparing myself for fullstack roles and opportunities.
