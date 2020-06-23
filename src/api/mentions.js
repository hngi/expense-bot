const Twit = require('Twit');
const config = require('../config');


const bot = new Twit(config.twitterKeys);

const getMentions =async (req, res, next) => {
  try {
    bot.get('statuses/mentions_timeline', (err, data, response) => {
			if (err) {
				throw err;
			} else {
				if (data.length < 1) {
					res.status(404).json({ messgae: 'No mentions on timeline' });
				} else {
					res.status(200).json({ mentions: data });
				}
			}
		});
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error
    });
    next(error);
  }
}


module.exports = getMentions;