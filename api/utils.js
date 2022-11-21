function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "Must be LOGGED IN to do this action!",
    });
  }
  next();
}

module.exports = { requireUser };
