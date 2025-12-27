// This must be the very first line to ensure environment variables are loaded
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const keys = require("./config/keys");

require("./models/User");
require("./models/FocusSession");

require("./services/passport");

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// SUPER EARLY DEBUG
app.get("/health", (req, res) => {
  console.log("Health check hit!");
  res.send("Server is healthy");
});

app.use(
  cors({
    origin: keys.frontendURL, // The origin of your React app
    credentials: true,
  })
);

// Debug Middleware
// Debug Middleware
app.use((req, res, next) => {
  console.log(`INCOMING: ${req.method} ${req.originalUrl}`);
  console.log("Cookies:", req.headers.cookie);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.use(express.json());
app.use(
  session({
    secret: keys.cookieKey, // Use the same key you had before for signing the session ID
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Debug Routes
// Debug Routes
app.get("/test-auth", (req, res) => res.send("Auth route reachable"));

// Inline Auth Route for stability check
app.get(
  "/auth/github",
  (req, res, next) => {
    console.log("--> Inline /auth/github hit");
    next();
  },
  passport.authenticate("github", { scope: ["user:email"], prompt: "login" })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

app.get("/api/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.FRONTEND_URL}/`);
  });
});

app.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

require("./routes/settingsRoutes")(app);
require("./routes/sessionRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on port ${PORT}`);
});
