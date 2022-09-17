const express = require("express");
const router = express.Router();
const fs = require("fs");
const { millify } = require("millify");

router.get("/", (req, res) => {
  let files = fs
    .readdirSync(__dirname + "/../public")
    .filter((x) => !x.startsWith("."));

  if (req.query.search && req.query.search.length > 0) {
    files = files.filter((x) =>
      x.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // get sizes of files
  files = files.map((x) => {
    return {
      name: x,
      size: millify(fs.statSync(__dirname + "/../public/" + x).size, {
        units: ["B", "KB", "MB", "GB", "TB"],
        space: true,
      }),
    };
  });

  res.render("files", {
    files: files,
    search: req.query.search,
  });
});

module.exports = router;
