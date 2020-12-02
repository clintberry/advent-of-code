const fs = require('fs');
const readline = require('readline');

var data = [];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});
var good = 0;

lineReader.on('line', function (line) {
    var pwa = line.split(" ")
    var range = pwa[0].split("-")
    //console.log(pwa[1].charAt(0))
    var entry = {
        min: parseInt(range[0]),
        max: parseInt(range[1]),
        letter: pwa[1].charAt(0),
        letterCount:0,
        password: pwa[2],
    }

    // for (var position = 0; position < entry.password.length; position++) {
    //     if (entry.password.charAt(position) == entry.letter) {
    //         //console.log(entry.password.charAt(position), entry.letter)
    //         entry.letterCount += 1;
    //     }
    // }
    if ((entry.password.charAt(entry.min-1) == entry.letter && entry.password.charAt(entry.max-1) != entry.letter) || (entry.password.charAt(entry.min-1) != entry.letter && entry.password.charAt(entry.max-1) == entry.letter)) {
        console.log(entry)
        good++;
    }

    //console.log(entry)
    data.push(parseInt(entry))
});

lineReader.on('close', function(){
    console.log(good)
});