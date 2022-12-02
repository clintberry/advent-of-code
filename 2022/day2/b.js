const fs = require('fs');

var points = {
    "A X": 3, // rock lose (0) - scissors (3)
    "A Y": 4, // rock draw (3) - rock (1)
    "A Z": 8, // rock win (6) - paper (2)
    "B X": 1, // paper lose (0) - rock (1)
    "B Y": 5, // paper draw (3) - paper (2)
    "B Z": 9, // paper win (6) - scissors (3)
    "C X": 2, // scissors lose (0) - paper (2)
    "C Y": 6, // scissors draw (3) - scissors (3)
    "C Z": 7, // scissors win (6) - rock (1)
}
var array = fs.readFileSync('input.txt').toString().split("\n");

var score = 0;
for(i in array) {
    score += points[array[i]];
}
console.log(score);