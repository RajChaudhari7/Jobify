# JOBIFY

JOBIFY is a modern job portal web application built with the MERN stack. It connects recruiters and job seekers in a seamless environment, enabling efficient job posting, application, and management.

## Features

### For Recruiters
- Register and log in as a company recruiter
- Add  delete, and manage job postings
- Toggle job visibility (visible/invisible)
- Receive and review job applications
- Accept or reject job applications

### For Job Seekers
- Register and log in via Clerk authentication
- Apply for jobs
- Upload a resume (required before applying)
- Redirect to upload resume page if not uploaded
- Check application status

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Clerk

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- (Optional) Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/JOBIFY.git
   cd JOBIFY
   ```
2. Install frontend and backend dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Set up environment variables as needed for MongoDB URI, Clerk credentials, etc.

4. Start the development servers:
   ```bash
   # In one terminal
   cd server
   npm run server

   # In another terminal
   cd client
   npm run dev
   ```

## Usage

- Recruiters can register/log in, post jobs, manage applications, and control job visibility.
- Job seekers must upload a resume before applying. Once uploaded, they can apply to jobs and track their application status.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for suggestions or improvements.

## License

[MIT](LICENSE)

## Acknowledgements

- MERN Stack Community
- Clerk Authentication

---

Feel free to customize this README for your needs!
