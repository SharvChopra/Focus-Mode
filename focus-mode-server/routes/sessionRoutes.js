const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const FocusSession = mongoose.model("focusSessions");

module.exports = (app) => {
  // Create a new, detailed focus session
  app.post("/api/sessions", requireLogin, async (req, res) => {
    const { title, startTime, endTime } = req.body;
    const session = new FocusSession({
      title,
      startTime,
      endTime,
      _user: req.user.id, // Corrected from __user to _user
    });
    await session.save();
    res.status(201).send(session);
  });

  // Create a quick 30-minute focus session
  app.post("/api/sessions/quick", requireLogin, async (req, res) => {
    const now = new Date();
    const endTime = new Date(now.getTime() + 30 * 60000);

    const session = new FocusSession({
      title: "Quick Focus",
      startTime: now,
      endTime: endTime,
      _user: req.user.id,
    });
    await session.save();
    res.status(201).send(session);
  });

  // Get all data for the main dashboard
  app.get("/api/dashboard", requireLogin, async (req, res) => {
    const sessions = await FocusSession.find({
      _user: req.user.id,
      startTime: { $gte: new Date() },
    }).sort({ startTime: 1 }); // Sort by start time, earliest first

    // In a real app, you would calculate stats here.
    // We'll send placeholder data for now.
    res.send({
      upcomingSessions: sessions,
      stats: {
        sessionsPlanned: sessions.length,
        focusTime: "1h 30m",
        sitesBlocked: req.user.blockedSites.length,
      },
      thisWeek: { focusStreak: 3, totalHours: 7.5 },
    });
  });

  // Check the current focus status (for the Chrome Extension)
  app.get("/api/status", requireLogin, async (req, res) => {
    const now = new Date();
    const activeSession = await FocusSession.findOne({
      _user: req.user.id,
      startTime: { $lte: now },
      endTime: { $gte: now },
    });

    if (activeSession) {
      res.send({
        focusActive: true,
        sessionTitle: activeSession.title,
        endTime: activeSession.endTime,
        blockedSites: req.user.blockedSites,
      });
    } else {
      res.send({ focusActive: false });
    }
  });

  app.delete("/api/sessions/:id", requireLogin, async (req, res) => {
    try {
      const session = await FocusSession.findOneAndDelete({
        _id: req.params.id,
        _user: req.user.id, // Security: ensure the session belongs to the logged-in user
      });

      if (!session) {
        return res.status(404).send({ error: "Session not found" });
      }
      res
        .status(200)
        .send({
          message: "Session deleted successfully",
          deletedSession: session,
        });
    } catch (err) {
      res.status(500).send({ error: "Server error while deleting session" });
    }
  });
};
