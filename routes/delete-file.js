const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:id", (req, res) => {
  try {
    fs.unlinkSync(__dirname + "/../public/" + req.params.id);
  } catch (error) {}

  res.redirect(req.query.redirect || "/files");
});

module.exports = router;
