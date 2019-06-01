const { get } = require('axios');
const { coinMarketCapLatestMarketQuote } = require('./config');

const getLatestMarketQuoteForSymbol = symbol => (
  get(coinMarketCapLatestMarketQuote, {
    params: { symbol },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY,
      Accept: 'application/json',
    },
  })
);

module.exports = { getLatestMarketQuoteForSymbol };
