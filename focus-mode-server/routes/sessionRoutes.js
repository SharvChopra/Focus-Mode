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
      _user: req.user.id, 
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

  app.get("/api/dashboard", requireLogin, async (req, res) => {
    // FIX: Use endTime instead of startTime to include currently active sessions
    const sessions = await FocusSession.find({
      _user: req.user.id,
      endTime: { $gt: new Date() }, // Show anything that hasn't finished yet
    }).sort({ startTime: 1 }); // Sort by start time, earliest first

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayCount = await FocusSession.countDocuments({
      _user: req.user.id,
      startTime: { $gte: startOfDay },
    });

    res.send({
      upcomingSessions: sessions,
      stats: {
        sessionsPlanned: todayCount, // Shows total for today
        focusTime: "1h 30m", // You can calculate this dynamically later
        sitesBlocked: req.user.blockedSites ? req.user.blockedSites.length : 0,
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
      res.status(200).send({
        message: "Session deleted successfully",
        deletedSession: session,
      });
    } catch (err) {
      res.status(500).send({ error: "Server error while deleting session" });
    }
  });
};
