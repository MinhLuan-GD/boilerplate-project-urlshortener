require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;
let url = [];

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

  if (!original_url.match(/https:\/\/\w+.|http:\/\/\w+./))
    res.json({ error: "invalid url" });

  if (!url.some((x) => x.orU == original_url))
    url.push({ orU: original_url, shU: url.length + 1 });

  const short_url = url.find((x) => x.orU == original_url).shU;

  res.json({ original_url, short_url });
});

app.get("/api/shorturl/:short_url", (req, res) => {
  res.redirect(url[req.params.short_url - 1].orU);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
