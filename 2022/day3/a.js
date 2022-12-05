const fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

same = [];

for(i in lines) {
    // split string in half
    left = lines[i].slice(0, lines[i].length/2);
    right = lines[i].slice(lines[i].length/2, lines[i].length);

    for (let j = 0; j < left.length; j++) {
        if (right.includes(left[j])){
            same.push(left[j])
            break;
        }
    }
}

// Iterate over same values and add values to score
var score = 0;
for(i in same) {
    ascii = same[i].charCodeAt(0);
    if (ascii >= 65 && ascii <= 90) {
        score += ascii - 38;
    } else if (ascii >= 97 && ascii <= 122) {
        score += ascii - 96;
    }
}


console.log(score)