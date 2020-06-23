require('./src/bot');
const express = require('express');
const search = require('./src/api/search');
const authorize = require('./src/api/authorize');
const callback = require('./src/api/callback');
<<<<<<< HEAD
const like = require('./src/api/like')
=======
const like = require('./src/api/like');
>>>>>>> faed880d4a44cd7b1488fa27af2ef10771c0689e
const getMentions = require('./src/api/mentions');
const app = express();

app.use(express.static('src/public'));

app.get('/', home);
app.get('/oauth/authorize', authorize);
app.get('/oauth/callback', callback);
app.get('/api/tweets/:query?', getTweets);
<<<<<<< HEAD
app.get('/api/timeline/mentions', getMentions)
app.post('/api/timeline/mentions',likeUsers)
=======
app.get('/api/timeline/mentions', getMentions);
app.post('/api/timeline/mentions/like', likeUsers);
>>>>>>> faed880d4a44cd7b1488fa27af2ef10771c0689e

function home(req, res) {
  res.sendFile(__dirname + '/src/views/index.html');
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
  console.lol('Your app is listening on port ' + listener.address().port);
});
