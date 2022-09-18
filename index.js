const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const path = require("path");
const authChecker = require("./middlewares/auth-checker");

app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/static", express.static("static"));

app.get("/", (req, res) => res.redirect("/files"));
app.use("/login", require("./routes/login"));
app.use("/upload", [authChecker], require("./routes/upload"));
app.use("/files", authChecker, require("./routes/files"));
app.use("/editor", authChecker, require("./routes/editor"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
