const { get } = require('axios');
const { coinMarketCap } = require('./config');

const getLatestMarketQuoteForSymbol = symbol => (
  get(coinMarketCap.urls.latestMarketQuote, {
    params: { symbol },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY,
      Accept: 'application/json',
    },
  })
);

module.exports = { getLatestMarketQuoteForSymbol };
