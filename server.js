require("./src/bot");
const express = require("express");
const search = require("./src/api/search");
const authorize = require("./src/api/authorize");
const callback = require("./src/api/callback");
const like = require("./src/api/like");
const getMentions = require("./src/api/mentions");
const crc = require("./src/helpers/crc");
const app = express();

app.use(express.static("src/public"));

// CRC for Twitter Webhook
app.use(crc);

app.get("/", home);
app.get("/oauth/authorize", authorize);
app.get("/oauth/callback", callback);
app.get("/api/tweets/:query?", getTweets);
app.get("/api/timeline/mentions", getMentions);
app.post("/api/timeline/mentions/like", likeUsers);

function home(req, res) {
  res.sendFile(__dirname + "/src/views/index.html");
}

function likeUsers(req, res) {
  like(res);
}

function getTweets(req, res) {
  const query = req.params.query || `#${process.env.TWITTER_USERNAME}`;

  search(query, function(err, data) {
    if (err) {
      res.json([]);
    } else {
      res.json(data.statuses);
    }
  });
}

const listener = app.listen(process.env.PORT, function() {
  console.lol("Your app is listening on port " + listener.address().port);
});
