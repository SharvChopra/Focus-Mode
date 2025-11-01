const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");

module.exports = (app) => {
  // Get the current user's list of blocked sites
  app.get("/api/settings/blocked-sites", requireLogin, async (req, res) => {
    // It's safer to re-fetch the user to ensure data is fresh
    const user = await User.findById(req.user.id);
    res.send(user.blockedSites || []);
  });

  // Update the user's list of blocked sites
  app.post("/api/settings/blocked-sites", requireLogin, async (req, res) => {
    const { blockedSites } = req.body;

    // Find the user and update their list
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { blockedSites },
      { new: true } // This option returns the updated document
    );

    res.send(updatedUser);
  });
};
