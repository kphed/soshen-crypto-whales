// twitter
// "An asynchronous client library for the Twitter REST and Streaming API's."
// https://github.com/desmondmorris/node-twitter
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweet = status => (
  client.post('statuses/update', { status }, (error, tweet) => {
    if (error) {
      throw error;
    }

    console.log('Tweet sent', tweet.text);
  })
);

module.exports = {
  tweet,
};
