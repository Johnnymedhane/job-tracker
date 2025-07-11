# Job Tracker App

A modern, full-stack job application tracker built with React and Node.js. Easily manage your job search, track applications, and organize your must-have and nice-to-have criteria for each opportunity.

## Features

- **Add, edit, and delete job applications**
- **Define and manage must-have and nice-to-have criteria**
- **Rank jobs based on your criteria**
- **Responsive, user-friendly UI**
- **Authentication for secure access**
- **Persistent data storage with backend API**
- **Animated transitions and modern design**

## Tech Stack

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express
- **State Management:** React Context API
- **Routing:** React Router

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/job-tracker.git
   cd job-tracker
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the frontend:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Start the backend:**
   ```sh
   cd job-tracker-backend
   npm install
   npm start
   ```

### Environment Variables
- Configure backend API URLs and authentication secrets as needed in `.env` files for both frontend and backend.

## Usage

- **Add a job:** Click "+ Add New Job" and fill in the job details.
- **Edit a job:** Click the edit icon next to a job entry.
- **Delete a job:** Click the delete icon next to a job entry.
- **Manage criteria:** Define must-have and nice-to-have criteria from the criteria page.
- **Authentication:** Sign up or log in to access your job tracker securely.

## Folder Structure

```
job-tracker/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── index.css
│   └── App.jsx
├── job-tracker-backend/
│   ├── server.js
│   └── ...
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

---

**Enjoy tracking your job search and landing your dream job!**
