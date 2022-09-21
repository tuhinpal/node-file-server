const express = require("express");
const router = express.Router();
const api = require("termux");
const fs = require("fs");

router.get("/click-picture", async (req, res) => {
  try {
    let id = "nfs-click.jpg";
    if (!api.hasTermux) throw new Error("Termux api not supported");
    let camId = req.query.camId || 0;
    camId = parseInt(camId);

    if (camId > 1) camId = 1;
    if (camId < 0) camId = 0;

    await new Promise((resolve, reject) => {
      api
        .cameraPhoto()
        .camera(camId)
        .outputFile(`${__dirname}/../public/${id}`)
        .run()
        .then(() => resolve());

      setTimeout(() => {
        reject(new Error("Timeout"));
      }, 30000);
    });

    res.sendFile(id, { root: __dirname + "/../public" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
