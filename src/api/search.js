const Twit = require('twit');
const config = require('../config');

const bot = new Twit(config.twitterKeys);
const param = config.twitterConfig;

function search(query, callback) {
  if (!query) {
    console.lol('NULL: Nothing to search...');
    return;
  }

  bot.get('search/tweets', {
    q: query,
    result_type: param.resultType,
    lang: param.language,
    filter: 'safe',
    count: param.searchCount
  }, callback);
}

module.exports = search;
