const { auth } = require("../../../config/default");
const got = require("got");
const oauth = {
  token: auth.token,
  token_secret: auth.token_secret,
  consumer_key: auth.consumer_key,
  consumer_secret: auth.consumer_secret,
};

async function markAsRead(messageId, senderId) {
  const body = {
    url: "https://api.twitter.com/1.1/direct_messages/mark_read.json",
    form: {
      last_read_event_id: messageId,
      recipient_id: senderId,
    },
    oauth: oauth,
  };
  await got.post(body);
}

async function indicateTyping(senderId) {
  const body = {
    url: "https://api.twitter.com/1.1/direct_messages/indicate_typing.json",
    form: {
      recipient_id: senderId,
    },
    oauth: oauth,
  };
  await got.post(body);
}

async function sendMessage(senderId, message) {
  const body = {
    url: "https://api.twitter.com/1.1/direct_messages/events/new.json",
    oauth: oauth,
    json: {
      event: {
        type: "message_create",
        message_create: {
          target: {
            recipient_id: senderId,
          },
          message_data: {
            text: message,
          },
        },
      },
    },
  };
  await got.post(body);
}

module.exports = {
  markAsRead,
  indicateTyping,
  sendMessage,
};
