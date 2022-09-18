const { PASSWORDS } = require("../config");

module.exports = function authenticate(req, res, next) {
  try {
    let token = req.cookies.token;

    if (PASSWORDS.includes(token)) {
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    res.redirect(307, "/login?redirect=" + encodeURIComponent(req.originalUrl));
  }
};
