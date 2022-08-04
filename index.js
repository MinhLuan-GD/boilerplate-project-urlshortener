require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", (req, res) => {
  const original_url = req.body.url;

  if (!original_url.match(/https:\/\/\w+\.\w+|http:\/\/\w+\.\w+/))
    res.json({ error: "invalid url" });

  res.json({ original_url });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
