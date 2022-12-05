const fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var elves = [];

var count = 0;
for(i in lines) {
    var pair = lines[i].split(",")
    var range1 = pair[0].split("-")
    var range2 = pair[1].split("-")
    var ranges = [parseInt(range1[0]), parseInt(range1[1]), parseInt(range2[0]), parseInt(range2[1])]
    console.log(ranges)

    // If the first range is inside the second range, add to count
    if ((ranges[0] >= ranges[2] && ranges[1] <= ranges[3]) || ((ranges[2] >= ranges[0] && ranges[3] <= ranges[1]))) {
        count++;
    } else if ((ranges[0] >= ranges[2] && ranges[0] <= ranges[3]) || ((ranges[1] >= ranges[2] && ranges[1] <= ranges[3]))) {
        count++;
    }

}

console.log(count)