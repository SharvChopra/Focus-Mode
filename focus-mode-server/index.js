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

app.use(
  cors({
    origin: "http://localhost:5173", // The origin of your React app
    credentials: true,
  })
);

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

require("./routes/authRoutes")(app);
require("./routes/settingsRoutes")(app);
require("./routes/sessionRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on port ${PORT}`);
});
