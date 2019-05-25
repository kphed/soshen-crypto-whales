// dotenv
// "Loads environment variables from a .env file into process.env"
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// NodeJS boilerplate
// https://nodejs.org/en/docs/guides/getting-started-guide/
const http = require('http');
const websocket = require('./websocket');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Goliath online.');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
