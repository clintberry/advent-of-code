const fs = require('fs');

var crates = [
    [],
    ["B","S","V","Z","G","P","W"],
    ["J","V","B","C","Z","F"],
    ["V","L","M","H","N","Z","D","C"],
    ["L","D","M","Z","P","F","J","B"],
    ["V","F","C","G","J","B","Q","H"],
    ["G","F","Q","T","S","L","B"],
    ["L","G","C","Z","V"],
    ["N","L","G"],
    ["J","F","H","C"]
];

var lines = fs.readFileSync('input.txt').toString().split("\n");

for(i in lines) {
    words = lines[i].split(" ");
    count = parseInt(words[1]);
    from = parseInt(words[3]);
    to = parseInt(words[5]);
    console.log(count, from, to)

    // for count times move creates
    for(j = 0; j < count; j++) {
        // move crates from -> to
        crates[to].push(crates[from].pop());
    }
}

console.log(crates);

