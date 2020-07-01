const debug = require("debug")("log");
const {
  markAsRead,
  indicateTyping,
  sendMessage,
} = require("../../responses/direct_message");

const handleDirectMessages = async (event) => {
  if (!event.direct_message_events) {
    return;
  }

  const message = event.direct_message_events.shift();
  if (
    typeof message === "undefined" ||
    typeof message.message_create === "undefined"
  ) {
    return;
  }

  const dm = message.message_create;
  if (dm.sender_id === dm.target.recipient_id) {
    return;
  }

  await markAsRead(dm.id, dm.sender_id);
  const senderName = event.users[dm.sender_id].screen_name;
  debug(`@${senderName} says ${dm.message_data.text}`);
  await indicateTyping(dm.sender_id);
  await sendMessage(dm.sender_id, `Hi @${senderName}! 👋`);
};

module.exports = handleDirectMessages;
