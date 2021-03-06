module.exports = {
  hostname: '127.0.0.1',
  port: 3000,
  whaleTransactionMinimum: {
    // For this demo, any ADA transfer of 1M+ would be considered a whale
    ada: 5000000,
  },
  lovelaceToAdaRate: 1000000, // 1 ADA = 1,000,000 Lovelaces
  seizaExplorer: {
    transactionUrl: 'https://seiza.com/blockchain/transaction',
    addressUrl: 'https://seiza.com/blockchain/address',
  },
  coinMarketCap: {
    urls: {
      currencies: 'https://coinmarketcap.com/currencies',
      latestMarketQuote: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    },
  },
};
