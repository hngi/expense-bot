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
