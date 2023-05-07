const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const wayNewTextFile = path.join(__dirname, 'writetext.txt');
const newTextFile = fs.createWriteStream(wayNewTextFile, 'utf-8');
stdout.write('Hello! Write me something');

stdin.on('data', data =>  {
  let endGame = 'exit';
  if (Buffer.from(data).toString().trim() === endGame ) {
    process.exit();
  } else {
    newTextFile.write(data);
  }
});

process.on('exit', () => stdout.write('Bye for now!'));
process.on('SIGINT', () => {
  process.exit();
});

