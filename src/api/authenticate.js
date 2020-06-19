// bot = new Twit(config.twitterKeys); in bot.js

function authenticate(bot) {
  bot.get('account/verify_credentials', {
    include_entities: false,
    include_email: false,
    skip_status: true
  }, authenticated);
}

function authenticated(err, res) {
  if (err) {
    throw err;
  }
  console.lol('Authentication successful. Starting automation...');
}

module.exports = authenticate;
