const express = require("express");
const router = express.Router();
const api = require("termux");

router.get("/click-picture", async (req, res) => {
  try {
    if (!api.hasTermux) throw new Error("Termux api not supported");
    let camId = req.query.camId || 0;
    camId = parseInt(camId);

    await new Promise((resolve, reject) => {
      api
        .cameraPhoto()
        .camera(0)
        .outputFile(`${__dirname}/../public/.cam.jpg`)
        .run()
        .then(() => resolve());

      setTimeout(() => {
        reject(new Error("Timeout"));
      }, 30000);
    });

    res.sendFile(".cam.jpg", { root: __dirname + "/../public" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
