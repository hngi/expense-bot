const {
  Autohook,
  validateWebhook,
  validateSignature
} = require('twitter-autohook');
const config = require('../config');
const ngrok = require('ngrok');

const param = config.twitterKeys;

async function autohook() {
  try {
    const url = await ngrok.connect(config.twitterConfig.port);
    const webhookURL = `${url}/standalone-server/webhook`;
    const webhook = new Autohook();
    //await webhook.removeWebhook();
    await webhook.start(webhookURL);
    await webhook.subscribe({
      oauth_token: param.access_token,
      oauth_token_secret: param.access_token_secret
    });
  } catch (err) {
    console.lol('ERRORDERP: Webhook error!, Details: ', err);
    process.exit(-1);
  }
}

module.exports = autohook;
