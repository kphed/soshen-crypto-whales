const fs = require('fs');

// Convert from Buffer to a string, trim whitespace, and create an array from string elements (split by new line)
module.exports = fs.readFileSync(`${__dirname}/../top-100.txt`).toString().trim().split('\n');
