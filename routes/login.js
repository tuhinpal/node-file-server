const express = require("express");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

const passwords = process.env.PASSWORDS.split(",").map((x) => x.trim());

router.get("/", (req, res) => {
  try {
    let token = req.cookies.token;
    if (passwords.includes(token)) {
      res.redirect(req.query.redirect || "/files");
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    res.render("login", { errormessage: null });
  }
});

router.post("/", (req, res) => {
  try {
    if (passwords.includes(req.body.password)) {
      res.cookie("token", req.body.password, { maxAge: 24 * 60 * 60 * 1000 });
      res.redirect(req.query.redirect || "/files");
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.render("login", {
      errormessage: error.message,
    });
  }
});

module.exports = router;
