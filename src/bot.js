const Twit = require('twit');
const config = require('./config');
require('console.lol');

if (!Object.values(config.twitterKeys).every(Boolean)) {
  console.lol('ERRORDERP: Creds missing in .env file!');
  console.log('> Switching to Mock data...');
}
else {
  const bot = new Twit(config.twitterKeys);

  const authenticate = require('./api/authenticate');
  authenticate(bot);

  console.lol('Bot starting...');
}

// retweet on keywords
const retweet = require('./api/retweet');
retweet();
setInterval(retweet, config.twitterConfig.retweet);


/*
// example: tweet "hello world" 
bot.post('statuses/update', {status: 'hello world!'}, function(err, data, res) {
  if (err) {
    console.lol(err);
  }
  console.lol(data);
});
*/

/*
//const reply = require('./api/reply');
// reply to new follower
const followed = require('./api/followed');
const userStream = bot.stream(
  'statuses/filter',
  { track: `@${process.env.TWITTER_USERNAME}` }
);
userStream.on('follow', followed); */
