const Twit = require('twit');
const config = require('../config');
const bot = new Twit(config.twitterKeys);

//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline
let like = res => {
  get_mentions(res);
};

let get_mentions = res => {
  bot.get('statuses/mentions_timeline', function (err, data) {
    if (err) {
      console.log('Error , can get your mentions', err);
    } else {
      let mentions = [];
      if (!data || data.length == 0) {
        res.status(200).json('No Mentions');
        return;
      }
      //res.status(200).json(data)
      data.forEach(e => {
        mentions.push(e.id_str);
      });
      //res.status(200).json(mentions)

      //make sure the id of the users are not repeated

      mentions = new Set(mentions);

      //Like
      favoriteTweet(mentions, res);
    }
  });
};

let favoriteTweet = async (data, res) => {
  let errorMessage = [];
  let successMessage = []
  let result = data.forEach(e => {
    bot.post('favorites/create', { id: e }, function (err, response) {
      if (err) {
        console.log('CANNOT BE FAVORITE... Error', err);
        return errorMessage.push({ message: err.message, tweetId: e });
      }
      successMessage.push(
        {
          message: 'Liked',
          tweetId: e
        }
      )
      console.log('FAVORITED... Success!!!');
    });
    console.log(e);
  });
  setTimeout(() => {
    res.status(403).json(errorMessage || successMessage);
  }, 3000);
  
  console.log('reuslt', result)
};

module.exports = like;
