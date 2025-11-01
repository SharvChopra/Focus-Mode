const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const mongoose = require("mongoose");

require("dotenv").config();

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ githubId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        githubId: profile.id,
        displayName: profile.displayName || profile.username,
        avatar: profile.photos[0].value,
      }).save();

      done(null, user);
    }
  )
);
