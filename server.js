require('./src/bot');
const express = require('express');
const mockTweets = require("./src/mock/mock-tweets.json");
const search = require('./src/api/search');
const app = express();

app.use(express.static('public'));

app.get("/", hello);
app.get("/api/tweets/:query?", getTweets);
app.get("/api/comments", mockResponse); /* callback should call comment() in ./src/api */
app.get("/api/likes", mockResponse); /* callback should call like() in ./src/api */
app.get("/api/retweets", mockResponse); /* callback should call retweet() in ./src/api */
app.get("/api/followers", mockResponse); /* callback should call follow() in ./src/api */

function hello(req, res) {
  res.json({ greeting: "Hello, I am a Twitter bot created by ExpenseNG.com" });
}

function getTweets(req, res) {
  const query = req.params.query || `#${process.env.TWITTER_USERNAME}`;

  search(query, function(err, data) {
    if (err) {
      res.json([]);
    }
    else {
      res.json(data.statuses);
    }
  });
}

function mockResponse(req, res) {
  res.json({data: mockTweets});
}

const listener = app.listen(process.env.PORT, function () {
  console.lol('Your app is listening on port ' + listener.address().port);
});
