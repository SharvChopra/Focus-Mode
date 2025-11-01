module.exports = (req, res, next) => {
  if (!req.user) {
    // If no user is logged in, send an "Unauthorized" error
    return res
      .status(401)
      .send({ error: "You must be logged in to access this." });
  }

  next();
};
