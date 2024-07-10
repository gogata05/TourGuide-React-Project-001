const jwt = require("jsonwebtoken");

const { SECRET } = require("../config/env");
const { COOKIE_SESSION_NAME } = require("../constants");

exports.auth = (req, res, next) => {
  const token = req.cookies[COOKIE_SESSION_NAME];

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        res.clearCookie(COOKIE_SESSION_NAME);

        res.redirect("/auth/login");
      }

      req.user = decodedToken;
      res.locals.user = decodedToken;

      next();
    });
  } else {
    next();
  }
};
