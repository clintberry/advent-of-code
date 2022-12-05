const fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

badges = [];

for(i in lines) {
    // Every third line, compare to previous two
    if ((i+1) % 3 == 0) {
        // Iterate over each character in the line
        for (let j = 0; j < lines[i].length; j++) {
            // If the character exists in the previous two lines, add to badges
            if (lines[i-1].includes(lines[i][j]) && lines[i-2].includes(lines[i][j])) {
                badges.push(lines[i][j])
                break;
            }
        }
    }
}

console.log(badges)
// Iterate over same values and add values to score
var score = 0;
for(i in badges) {
    ascii = badges[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
        score += ascii - 38;
    } else if (ascii >= 97 && ascii <= 122) {
        score += ascii - 96;
    }
}


console.log(score)