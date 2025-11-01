const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/github", // Changed from /auth/google
    passport.authenticate("github", { scope: ["user:email"] }) // Changed strategy and scope
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
