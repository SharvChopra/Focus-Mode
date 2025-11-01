# Focus Mode - Full-Stack Productivity App

Focus Mode is a full-stack web application designed to help users minimize distractions and enhance productivity. It allows users to schedule dedicated focus sessions, and it automatically blocks a user-defined list of distracting websites during those periods.

The application uses GitHub for secure authentication and features a web-based dashboard for scheduling, a settings panel for managing blocked sites, and a companion Chrome Extension to enforce the blocking rules.

## Key Features

* **Secure GitHub Authentication**: Users can sign in securely with their GitHub account using Passport.js.
* **Session Scheduling**: A clean dashboard interface for scheduling future focus sessions or starting an immediate "Quick 30min Focus."
* **Dynamic Blocklist**: A settings page where users can easily add or remove any website they find distracting.
* **Automatic Enforcement**: A lightweight Chrome Extension runs in the background, automatically checking the server's status every minute.
* **Real-Time Blocking**: Uses the `declarativeNetRequest` API to efficiently block/unblock sites without any user intervention.
* **Full-Stack Architecture**: Built with a React frontend, Node.js/Express backend, and MongoDB database.


## Tech Stack

* **Frontend**: React, React Router, Axios, Framer Motion
* **Backend**: Node.js, Express
* **Database**: MongoDB, Mongoose
* **Authentication**: Passport.js (with `passport-github2` and `express-session`)
* **Browser Extension**: Chrome API (`declarativeNetRequest`, `alarms`)

## Local Installation and Setup

To run this project on your local machine, you will need to run all three parts: the backend server, the frontend app, and the Chrome extension.

### 1. Backend (focus-mode-server)

The backend is the brain of the application.

Navigate to the backend folder:
```bash
cd focus-mode-server
