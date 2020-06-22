const Twit = require('twit');
const unique = require('unique-random-array');
const config = require('../config');
const isReply = require('../helpers/isReply');

const param = config.twitterConfig;
const randomReply = unique(param.randomReply.split('|'));

const bot = new Twit(config.twitterKeys);

function getMentions(req, res) {
	bot.get('statuses/mentions_timeline', (err, response, data) => {
		if (err) {
			throw err;
		} else if (response.length < 1) {
			res.status(404).json({ message: 'No mentions' });
		} else {
			res.status(200).json(response);
		}
	});
}

// get the mentions timeline and automatically send back a response to a user

function replyMention(req, res) {
	bot.get(
		'statuses/mentions_timeline?count=200&trim_user=true',
		(err, response, data) => {
			if (err) {
				throw err;
			} else if (response.length < 1) {
				res.status(404).json({ message: 'No mentions on timeline' });
			} else {
				// grab random tweet ID to reply
				const rando = Math.ceil(Math.random() * response.statuses.length);
				let replyId;

				if (!isReply(response.statuses[rando])) {
					replyId = response.statuses[rando].id_str;
				}
				bot.post('statuses/update', { status: reply }, (err, response) => {
					if (err) {
						console.lol('ERRORDERP: Cannot reply');
						res.status(400).json('Cannot reply!!');
					} else {
						console.lol('SUCCESS: Reply!');
						res.json('Reply success');
					}
				});
			}
		}
	);
}

function retweetMention(req, res) {
	bot.get(
		'statuses/mentions_timeline.json?count=200&trim_user=true',
		(err, response, data) => {
			if (err) {
				console.lol('ERRORDERP: Error performing request');
				throw err;
			} else if (response.length < 1) {
				res.status(404).json({ message: 'No mentions on timeline' });
			} else {
				// grab random tweet ID to retweet
				const rando = Math.ceil(Math.random() * response.statuses.length);
				let retweetId;

				if (!isReply(response.statuses[rando])) {
					retweetId = response.statuses[rando].id_str;
				}

				bot.post(
					'statuses/retweet/:id',
					{
						id: retweetId,
					},
					(err, response) => {
						if (err) {
							console.lol('ERRORDERP: Retweet!');
						} else {
							console.lol('SUCCESS: RT', 'RANDOM ID: ', rando);
						}
					}
				);
			}
		}
	);
}

const reply = (event) => {
	let screenName = event.source.screen_name;

	if (screenName === config.twitterConfig.username) {
		return;
	} else {
		const response = randomReply();
		const res = response.replace('${screename}', screenName);
	}
};

module.exports = (replyMention, retweetMention, getMentions);
