const { consumer, auth } = require('./consumer');

function callback(req, res) {
  consumer.getOAuthAccessToken(
    auth.oauthToken,
    auth.oauthTokenSecret,
    req.query.oauth_verifier,
    function (err, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (err) {
        res.json({ error: err });
      }
      else if (results.screen_name !== process.env.TWITTER_USERNAME) {
        res.json({
          error: "Human, only bot @expenseng should login! You've just been Hacked!"
        });
      }
      else {
        res.json({
          url: '/oauth/callback',
          accessToken: oauthAccessToken,
          accessSecret: oauthAccessTokenSecret
        });
      }
    }
  );
}

module.exports = callback;
