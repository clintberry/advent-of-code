const fs = require('fs');
const readline = require('readline');

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
  });

  lineReader.on('line', function (line) {
    console.log('Line from file:', line);
  });