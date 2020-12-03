const fs = require('fs');
const readline = require('readline');

var data = [];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {

    console.log(entry)
    data.push(parseInt(entry))
});

lineReader.on('close', function(){
    console.log("Done")
});