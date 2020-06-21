const { consumer, auth } = require('./consumer');

function authorize(req, res) {
  consumer.getOAuthRequestToken(
    function (err, oauthToken, oauthTokenSecret, response) {
      if (err) {
        res.json({ error: err });
      }
      else {
        auth.oauthToken = oauthToken;
        auth.oauthTokenSecret = oauthTokenSecret;
        res.redirect(
          `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
        );
      }
    }
  );
}

module.exports = authorize;
