# Focus Mode - Full-Stack Productivity App

Focus Mode is a modern, full-stack web application designed to help users minimize digital distractions and enhance deep work. It allows users to schedule dedicated focus sessions, and uses a companion Chrome Extension to automatically block distracting websites during those periods.

The application uses GitHub for secure authentication and features a web-based dashboard for scheduling, a settings panel for managing blocked sites, and a companion Chrome Extension to enforce the blocking rules.

Key Features

Secure GitHub Authentication: Users can sign in securely with their GitHub account using Passport.js.

Session Scheduling: A clean dashboard interface for scheduling future focus sessions or starting an immediate "Quick 30min Focus."

Dynamic Blocklist: A settings page where users can easily add or remove any website they find distracting.

Automatic Enforcement: A lightweight Chrome Extension runs in the background, automatically checking the server's status every minute.

Real-Time Blocking: Uses the declarativeNetRequest API to efficiently block/unblock sites without any user intervention.

Full-Stack Architecture: Built with a React frontend, Node.js/Express backend, and MongoDB database.

Screenshots

Landing Page

Dashboard

Scheduling Modal

Settings Page

Blocked Page

(Note: To make these images work, create a folder named screenshots in your project, add your images, and update the URLs after you push to GitHub.)

Tech Stack

Frontend: React, React Router, Axios, Framer Motion

Backend: Node.js, Express

Database: MongoDB, Mongoose

Authentication: Passport.js (with passport-github2 and express-session)

Browser Extension: Chrome API (declarativeNetRequest, alarms)

Local Installation and Setup

To run this project on your local machine, you will need to run all three parts: the backend server, the frontend app, and the Chrome extension.

1. Backend (focus-mode-server)

The backend is the brain of the application.

Navigate to the backend folder:

cd focus-mode-server

Install dependencies:

npm install

Create your .env file: Create a file named .env in the focus-mode-server root. This is critical for storing your secret keys.

GITHUB_CLIENT_ID=your_client_id_from_github
GITHUB_CLIENT_SECRET=your_client_secret_from_github
MONGO_URI=your_mongodb_connection_string
COOKIE_KEY=a_long_random_string_for_sessions

Run the server:

node index.js

Your backend server should now be running on http://localhost:5000.

2. Frontend (client)

The frontend is the web dashboard you interact with. Open a new, separate terminal for this step.

Navigate to the frontend folder:

cd client

Install dependencies:

npm install

Run the client:

npm start

Your browser should open to http://localhost:3000 (or a similar port like 5173).

3. Chrome Extension (extension)

The extension is the "enforcer" that blocks the websites.

Open Google Chrome.

Navigate to chrome://extensions in the address bar.

Turn on "Developer mode" (usually a toggle in the top-right corner).

Click the "Load unpacked" button.

Select the entire /extension folder from your project directory.

The "Focus Mode Enforcer" extension will now be installed and running.
