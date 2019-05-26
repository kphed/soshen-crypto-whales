// ws
// "ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation"
// https://github.com/websockets/ws
const WebSocket = require('ws');
const { tweet } = require('./twitter');
const { convertTransactionOutputsAmountToAda } = require('./util');
const {
  whaleTransactionMinimum,
  seizaExplorerTransactionUrl,
} = require('./config');

// Open up a secure WebSocket connection to the soshen node endpoint
const ws = new WebSocket(`wss://${process.env.SOSHEN_NODE_ENDPOINT}`);

// Since the point of this app is to tweet whenever there's a large transaction, we'd want to subscribe to
// the channel that provides us with a stream of network transactions as they occur
const messageChannels = ['transactionCreated'];

// Upon the WebSocket connection being opened, send the server the channels that we would like messages for
ws.on('open', () => messageChannels.forEach(messageChannel => ws.send(`sub ${messageChannel}`)));

ws.on('message', (message) => {
  // Parse stringified message payload
  const { data } = JSON.parse(message);
  const transactionAmount = convertTransactionOutputsAmountToAda(data.outputs_amount);

  // Tweet transaction only if it's larger than the ADA whale transaction minimum
  if (transactionAmount >= whaleTransactionMinimum.ada) {
    const formattedTransactionAmount = transactionAmount.toLocaleString(undefined, { maximumFractionDigits: 2 });

    // Tweet transaction amount with link to Seiza Explorer to enable transaction sleuthing
    return tweet(`🐳 ${formattedTransactionAmount} #ADA #CARDANO\n\nTransaction: ${seizaExplorerTransactionUrl}/${data.hash}`)
  }
});
