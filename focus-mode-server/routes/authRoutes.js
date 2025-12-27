const passport = require("passport");

module.exports = (app) => {
  console.log("--> Registering Auth Routes"); // Debug log

  app.get(
    "/auth/github",
    (req, res, next) => {
      console.log("--> /auth/github hit");
      next();
    },
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/auth/github/callback", // Changed from /auth/google/callback
    passport.authenticate("github"),
    (req, res) => {
      res.redirect("http://localhost:5173/dashboard");
    }
  );

  // Logout and current_user routes remain the same
  app.get("/api/logout", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
