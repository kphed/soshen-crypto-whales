// ws
// "ws is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation"
// https://github.com/websockets/ws
const WebSocket = require('ws');

// Open up a secure WebSocket connection to the soshen node endpoint
const ws = new WebSocket(`wss://${process.env.SOSHEN_NODE_ENDPOINT}`);

// Since the point of this app is to tweet whenever there's a large transaction, we'd want to subscribe to
// the channel that provides us with a stream of network transactions as they occur
const messageChannels = ['transactionCreated'];

// Upon the WebSocket connection being opened, send the server the channels that we would like messages for
ws.on('open', () => {
  console.log('WebSocket connection successfully opened');
  messageChannels.forEach((messageChannel) => {
    console.log('Subscribing to', messageChannel);
    return ws.send(`sub ${messageChannel}`);
  })
});

ws.on('message', (transaction) => {
  // TODO: Tweet whenever there is a large transaction
  console.log('transaction created', transaction);
});
