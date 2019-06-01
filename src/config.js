module.exports = {
  hostname: '127.0.0.1',
  port: 3000,
  whaleTransactionMinimum: {
    // For this demo, any ADA transfer of 1M+ would be considered a whale
    ada: 5000000,
  },
  lovelaceToAdaRate: 1000000, // 1 ADA = 1,000,000 Lovelaces
  seizaExplorerTransactionUrl: 'https://seiza.com/blockchain/transaction',
}
