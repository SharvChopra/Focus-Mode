const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: String,
  displayName: String,
  avatar: String,
  blockedSites: { type: [String], default: [] },
});

mongoose.model("users", userSchema);
