const fs = require('fs');
const path = require('path');

const wayText = path.join(__dirname, 'text.txt');
const streamForReading = fs.createReadStream(wayText, 'utf-8');
streamForReading.on('data', data => console.log(data));
