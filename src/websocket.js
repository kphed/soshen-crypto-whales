// ws
// "ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation"
// https://github.com/websockets/ws
const WebSocket = require('ws');
const { tweet } = require('./twitter');
const { convertTransactionOutputsAmountToAda } = require('./util');
const { getLatestMarketQuoteForSymbol } = require('./coinmarketcap');
const {
  whaleTransactionMinimum,
  seizaExplorerTransactionUrl,
  coinMarketCap,
} = require('./config');

const messageChannels = ['transactionCreated'];

const connectToWs = () => {
  // Open up a secure WebSocket connection to the soshen node endpoint
  const ws = new WebSocket(`wss://${process.env.SOSHEN_NODE_ENDPOINT}`);

  // Since the point of this app is to tweet whenever there's a large transaction, we'd want to subscribe to
  // the channel that provides us with a stream of network transactions as they occur

  // Upon the WebSocket connection being opened, send the server the channels that we would like messages for
  ws.on('open', () => messageChannels.forEach(messageChannel => ws.send(`sub ${messageChannel}`)));

  // Attempt to reconnect on disconnect every 10 seconds
  ws.on('close', () => setTimeout(connectToWs, 10000));

  ws.on('message', async (message) => {
    // Parse stringified message payload
    const {
      event,
      data,
    } = JSON.parse(message);

    if (event === 'transactionCreated') {
      const transactionAmount = convertTransactionOutputsAmountToAda(data.outputs_amount);

      // Tweet transaction only if it's greater than or equal to the ADA whale transaction minimum
      if (transactionAmount >= whaleTransactionMinimum.ada) {
        try {
          const symbols = {
            crypto: 'ADA',
            fiat: 'USD',
          };

          // Set nested response `data` property to `responseData` since `data` is already defined
          const { data: { data: responseData } } = await getLatestMarketQuoteForSymbol(symbols.crypto);

          const cryptocurrency = {
            name: responseData[symbols.crypto].name,
            price: responseData[symbols.crypto].quote[symbols.fiat].price,
            amount: transactionAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }),
          };
          const fiat = (cryptocurrency.price * transactionAmount).toLocaleString('en', {
            style: 'currency',
            currency: symbols.fiat,
          });
          const tweetFragments = {
            crypto: `🐳 ${cryptocurrency.amount} #${symbols.crypto} #${cryptocurrency.name.toUpperCase()}`,
            fiat: `💵 ${fiat} #${symbols.fiat} ${coinMarketCap.urls.currencies}/${cryptocurrency.name.toLowerCase()}`,
            explorer: `🔎 ${seizaExplorerTransactionUrl}/${data.hash}`,
          };

          // Tweet the crypto amount, its fiat value, and a link to the Seiza Explorer for transaction sleuthing
          return tweet(`${tweetFragments.crypto}\n${tweetFragments.fiat}\n${tweetFragments.explorer}`)
        } catch (err) {
          throw err;
        }
      }
    }
  });
}

connectToWs();
