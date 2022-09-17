const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = __dirname + "/../public";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    let name = file.originalname;
    if (fs.existsSync(__dirname + "/../public/" + name)) {
      let i = 1;
      while (fs.existsSync(__dirname + "/../public/" + i + "-" + name)) {
        i++;
      }
      name = i + "-" + name;
    }

    callback(null, name);
  },
});

const upload = multer({ storage });

router.all("/", (req, res) => {
  res.render("upload", {
    errormessage: req.query.errormessage,
    message: req.query.message,
  });
});

router.post("/addfile", upload.array("file", 15), (req, res) => {
  try {
    res.redirect(307, `/upload?message=File uploaded successfully`);
  } catch (error) {
    res.redirect(307, `/upload?errormessage=${error.message}`);
  }
});

module.exports = router;
