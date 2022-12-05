const fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");


for(i in lines) {
    console.log(lines)
}