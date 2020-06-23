const { Autohook } = require("twitter-autohook");
const config = require("../config");

module.exports = async function() {
  const webhook = new Autohook();
  await webhook.removeWebhooks();
  await webhook.start(`${config.portForwardingUrl}/webhook/twitter`);
  await webhook.subscribe({
    oauth_token: config.auth.token,
    oauth_token_secret: config.auth.token_secret,
  });
};
