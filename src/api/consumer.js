const oauth = require('oauth');

const consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0A',
  'http://127.0.0.1:3000/oauth/callback',
  'HMAC-SHA1'
);

module.exports = {
  consumer: consumer,
  auth: {}
};
