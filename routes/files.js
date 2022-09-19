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
    let stat = fs.statSync(__dirname + "/../public/" + x);

    return {
      name: x,
      size: millify(stat.size, {
        units: ["B", "KB", "MB", "GB", "TB"],
        space: true,
      }),
      createdAt: stat.birthtime.toLocaleString(),
      createdAtObj: stat.birthtime,
      id: Buffer.from(x).toString("hex"),
    };
  });

  // sort files by date
  files = files.sort((a, b) => b.createdAtObj - a.createdAtObj);

  res.render("files", {
    files: files,
    search: req.query.search,
  });
});

router.get("/get/:id", (req, res) => {
  try {
    let id = Buffer.from(req.params.id, "hex").toString("utf-8");
    res.sendFile(id, { root: __dirname + "/../public" });
  } catch (error) {
    res.status(404).send("File not found");
  }
});

router.get("/delete/:id", (req, res) => {
  try {
    let id = Buffer.from(req.params.id, "hex").toString("utf-8");
    fs.unlinkSync(__dirname + "/../public/" + id);
  } catch (error) {}

  res.redirect(req.query.redirect || "/files");
});

router.get("/rename/:id", (req, res) => {
  try {
    let id = Buffer.from(req.params.id, "hex").toString("utf-8");

    let newname = req.query.name;

    // if new name does not have extension, add the old one
    try {
      if (!newname.includes(".")) {
        newname += id.substring(id.lastIndexOf("."));
      }
    } catch (_) {}

    fs.renameSync(
      __dirname + "/../public/" + id,
      __dirname + "/../public/" + newname
    );
  } catch (error) {}

  res.redirect(req.query.redirect || "/files");
});

module.exports = router;
