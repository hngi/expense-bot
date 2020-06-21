const Twit = require('twit');
const unique = require('unique-random-array');
const config = require('../config');
const isReply = require('../helpers/isReply');

const param = config.twitterConfig;
const randomReply = unique(param.randomReply.split('|'));

const bot = new Twit(config.twitterKeys);

// get the mentions timeline and automatically send back a response to a user
const replyMention = () => {
	bot.get(
		'statuses/mentions_timeline?count=200&trim_user=true',
		(err, data, response) => {
			if (err) {
				console.error('Cannot get mentions timeline \n', err);
			} else {
				// grab random tweet ID to reply
				const rando = Math.ceil(Math.random() * data.statuses.length);
				let replyId;

				if (!isReply(data.statuses[rando])) {
					replyId = data.statuses[rando].id_str;
				}
				bot.post('statuses/update', { status: reply }, (err, response) => {
					if (err) {
						console.lol('ERRORDERP: Cannot reply');
					} else {
						console.lol('SUCCESS: Reply!');
					}
				});
			}
		}
	);
};

const reply = (event) => {
	let screenName = event.source.screen_name;

	if (screenName === config.twitterConfig.username) {
		return;
	} else {
		const response = randomReply();
		const res = response.replace('${screename}', screenName);
	}
};

module.exports = replyMention;
