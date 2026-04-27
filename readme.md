# AI Resume Studio

A full-stack resume builder with AI-powered enhancement. Built with React, TypeScript, Node.js, Express, MongoDB, and the OpenAI API.

This was my first serious backend project. I came in knowing frontend well and spent most of this build breaking things, tracing why they broke, and fixing them properly. The learning happened almost entirely through debugging rather than tutorials.

**Live:** https://ai-resume-studio-snowy.vercel.app · **GitHub:** https://github.com/lalman-dev/AI-Resume-Studio

---

## What this does

- Resume creation, editing, and deletion with persistent MongoDB storage
- JWT-based authentication with protected routes
- AI-assisted enhancement for summaries and job descriptions via OpenAI
- Profile image upload via Multer and ImageKit (frontend preview works; full save flow partially stabilized — see notes below)
- Responsive UI with Redux Toolkit for global auth and resume state

---

## Tech stack

**Frontend:** React 19, TypeScript, Tailwind CSS v4, Redux Toolkit, React Router v7, Framer Motion, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Multer, ImageKit, OpenAI API

---

## What actually broke and what I learned from it

This is the part of the project I learned the most from.

**JWT authorization not working after login**

Users could log in successfully but every protected route returned 401. The issue wasn't broken auth logic — it was inconsistency. Some API calls attached the token manually, others relied on defaults, and they conflicted. I fixed it by implementing a global Axios interceptor that attaches the JWT to every request automatically, then removed all the manual header overrides.

This was the bug that changed how I think about debugging. I stopped looking for the broken line of code and started tracing the full request lifecycle — what the frontend sends, what middleware sees, what the route handler receives. That mental model applies to almost every integration bug I've hit since.

**Resume rename appearing to work but reverting on refresh**

The UI updated immediately so it looked fine, until refresh. Turned out there were two separate issues: a route mismatch (`/resume` vs `/resumes`) and an update payload that didn't match what the backend expected, so MongoDB was silently doing nothing. Fixed by aligning routes and correcting the payload structure. Taught me that silent failures are the hardest kind — the UI lying to you is worse than an error.

**AI job description enhancement always failing**

Summary enhancement worked, job description enhancement always failed. Same feature, different endpoint. The frontend was calling a route that didn't exist, and the response key names didn't match even after I fixed the route. Everything had to be aligned: endpoint path, response shape, and headers. Small naming mismatches between frontend and backend can silently break entire features.

**Multer + JSON payload conflict**

Some resume update requests randomly returned 400. Multer expected `multipart/form-data` but those requests were sending JSON, so the body was empty by the time it hit the route. Fixed by separating file upload logic from text update logic entirely — multipart only when a file is actually present.

---

## Known limitation: image upload

Image upload is partially implemented. Frontend preview works, Multer detects the file, ImageKit integration is in place. The part that didn't fully stabilize was coordinating multipart file uploads with complex resume state updates without introducing regressions elsewhere.

I documented this rather than hiding it. Trying to force it through would have broken the rest of the app, and knowing when to stop and stabilize is part of the decision-making. I plan to revisit this with a cleaner separation of concerns.

---

## What works reliably

- Authentication and protected routes
- Resume creation, editing, deletion
- AI summary and job description enhancement
- Frontend routing and Redux state management
- MongoDB persistence for all resume data

---

## Running locally

```bash
git clone https://github.com/lalman-dev/AI-Resume-Studio.git

# Frontend
cd client
npm install
npm run dev   # http://localhost:5173

# Backend (new terminal)
cd server
npm install
npm run server   # http://localhost:3000
```

Create `server/.env`:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## What I'd improve next

- Rebuild image upload with cleaner separation from resume update logic
- Add Jest and React Testing Library coverage
- Move from polling to a proper loading/optimistic update pattern for AI enhancement
