const Twit = require('twit');
const config = require('../config');
const bot = new Twit(config.twitterKeys);

const retweetMention = async (req, res, next) => {
  try {
    bot.get('statuses/mentions_timeline', (err, data, response) => {
      if (err) {
        res.status(400).json({ message: 'Error getting timeline', error: err })
      } else {
        let mentions = [];
        if (!data || data.length < 1) {
          res.status(404).json({ message: 'No mentions found!!' })
        } else {
          data.forEach(tweet => {
            mentions.push(tweet.id_str)
          });

          mentions = new Set(mentions);

          return retweetTweet(mentions, res);
        }
      }
    })
  } catch (error) {
    next(error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error
    });
  }
}

let retweetTweet = async (data, res) => {
  await data.forEach(tweet => {
    bot.post(`statuses/retweet`, { id: tweet }, (err, response) => {
      if (err) {
        if (err.message == 'You have already retweeted this Tweet.') {
          return console.log('Error: You have already retweeted this Tweet.');
        }
        res.status(403).json({
          error: err.message,
          from: tweet
        });
        console.log('Unable to retweet....', err);
      } else {
        console.log({ message: 'Retweeted successfully', id: tweet });
      }
    });
  })
}
const retweet = async (req, res, next) => {
  const query = `%23${process.env.TWITTER_USERNAME}`;
  try {
    bot.get('search/tweets', {
      q: query,
      result_type: 'mixed',
      count: 100
    }, (err, data, response) => {
      if (err) {
        if (err.message == 'You have already retweeted this.') {
          return console.log('Error: You have already retweeted this')
        } else {
          res.status(400).json({ error: err.message })
        }
      } else {
        if (data.length < 1 || !data) {
          res.status(404).json({ message: 'No tweets found' })
        } else {
          let hashtags = []
          data.statuses.forEach(status => {
            hashtags.push(status.id_str)

            return hashtags = [...new Set(hashtags)];
          })

          retweetTweet(hashtags, res)
        }
      }
    })
  } catch (error) {
    next(error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error
    });
  }

};

module.exports = { retweet, retweetMention };
