# Jobify — Job Portal

🔗 [Live Demo](https://jobify-server-rust.vercel.app) &nbsp;|&nbsp; 📂 [GitHub Repository](https://github.com/RajChaudhari7/Jobify)

A full-stack job portal built with the MERN stack that connects recruiters and job seekers in a seamless environment — enabling job posting, application management, and application status tracking.

---

## Features

### For Recruiters
- Register and log in as a company recruiter
- Post, edit, delete, and manage job listings
- Toggle job visibility (visible / hidden)
- Receive and review job applications
- Accept or reject applications

### For Job Seekers
- Register and log in via Clerk authentication
- Browse and search job listings
- Upload a resume (required before applying — redirected automatically if not uploaded)
- Apply for jobs with one click
- Track application status in a personal dashboard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Clerk |
| API | REST |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- Clerk account

### Installation

```bash
# Clone the repository
git clone https://github.com/RajChaudhari7/Jobify.git
cd Jobify

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create a `.env` file inside `server/`:

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/jobify
PORT=5000
```

Create a `.env` file inside `client/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000/api
```

### Run the App

```bash
# Start the backend (from /server)
npm run server

# Start the frontend in a new terminal (from /client)
npm run dev
```

Frontend: [http://localhost:5173](http://localhost:5173)  
Backend API: [http://localhost:5000](http://localhost:5000)

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register as recruiter or job seeker |
| POST | `/api/auth/login` | Login and receive session |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all visible job listings |
| GET | `/api/jobs/:id` | Get a single job |
| POST | `/api/jobs` | Create a job (recruiter only) |
| PUT | `/api/jobs/:id` | Update a job (recruiter only) |
| DELETE | `/api/jobs/:id` | Delete a job (recruiter only) |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/jobs/:id/apply` | Apply to a job (seeker only) |
| GET | `/api/applications/me` | Get my applications (seeker) |
| GET | `/api/jobs/:id/applicants` | Get applicants for a job (recruiter) |
| PUT | `/api/applications/:id/status` | Accept or reject an application (recruiter) |

---

## Project Structure

```
Jobify/
├── client/                   # React frontend
│   └── src/
│       ├── pages/            # Auth, Job listings, Dashboards
│       ├── components/       # Reusable UI components
│       └── context/          # Auth context
└── server/                   # Express backend
    ├── models/               # Mongoose schemas (User, Job, Application)
    ├── routes/               # API route definitions
    ├── middleware/           # Auth & role middleware
    └── controllers/          # Business logic
```

---


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for suggestions or improvements.

---

## Author

**Raj Chaudhari** — [LinkedIn](https://linkedin.com/in/raj-chaudhari-mern) · [GitHub](https://github.com/RajChaudhari7)
