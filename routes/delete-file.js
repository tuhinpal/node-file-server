const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/:id", (req, res) => {
  try {
    let id = Buffer.from(req.params.id, "hex").toString("utf-8");
    fs.unlinkSync(__dirname + "/../public/" + id);
  } catch (error) {}

  res.redirect(req.query.redirect || "/files");
});

module.exports = router;
