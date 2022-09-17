require("dotenv").config();

module.exports = function authenticate(req, res, next) {
  try {
    let availablepwd = process.env.PASSWORDS.split(",").map((x) => x.trim());
    let token = req.cookies.token;

    if (availablepwd.includes(token)) {
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    res.redirect(
      307,
      "/login?redirect=" + encodeURIComponent("/files" + req.url)
    );
  }
};
