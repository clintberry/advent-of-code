const fs = require('fs');

var points = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
}
var array = fs.readFileSync('input.txt').toString().split("\n");

var score = 0;
for(i in array) {
    score += points[array[i]];
}
console.log(score);