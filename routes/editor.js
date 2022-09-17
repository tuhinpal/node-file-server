const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use(express.json());

let datapath = __dirname + "/../public/.editordata";

router.get("/", (req, res) => {
  let data = "";

  try {
    data = fs.readFileSync(datapath, "utf8");
  } catch (error) {}

  res.render("editor", {
    data: data.toString(),
  });
});

router.post("/save", (req, res) => {
  let data = req.body.data;
  fs.writeFileSync(datapath, data);
  res.json({
    ok: true,
  });
});

module.exports = router;
