const fs = require('fs');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var currentPrefix = '';
var directories = {};
for(i in lines) {
    // Is this line a change directory command?
    if (lines[i].substring(0,5) == "$ cd "){
        var dir = lines[i].substring(5).trim()
        if (dir == '..'){
            currentPrefix = currentPrefix.substring(0, currentPrefix.lastIndexOf('/'));
        }
        else {
            currentPrefix = currentPrefix.concat('/', dir);
        }
    }
    else if (lines[i].substring(0,4) == "$ ls") {
        continue
    }
    // This is output from ls
    else {
        // If first 3 characters aren't "dir" then let's add up the size!
        if (lines[i].substring(0,3) != "dir"){
            // Split string on spaces and parse first column as int
            var size = parseInt(lines[i].split(' ')[0]);
            console.log(i, lines[i], size)
            addSizeToDirectories(currentPrefix, size);
        }
    }
    // if (i == 40){
    //     console.log(directories)
    //     break
    // }
}


console.log(directories);

// Find all directories with less than or equal to 10000 size and add them up
var total = 0;
for (i in directories){
    if (directories[i] <= 100000){
        //console.log(i)
        total += directories[i];
    }
}

console.log(total)

function addSizeToDirectories(currentPrefix, size) {
    if (!directories.hasOwnProperty(currentPrefix)){
        directories[currentPrefix] = 0;
    }
    directories[currentPrefix] += size;
    
    if (currentPrefix != "//"){
        addSizeToDirectories(currentPrefix.substring(0, currentPrefix.lastIndexOf('/')), size);
    }
    else {
        return
    }
}

// part 2

var neededSpace = 30000000-(70000000 - directories['//']);
console.log("Needed space: ", neededSpace)

// Find all directories with size greater than neededSpace
var bigEnough = [];
for (i in directories){
    if (directories[i] >= neededSpace){
        bigEnough.push(directories[i]);
    }
}
// Sort bigEnough in descending order
bigEnough.sort(function(a, b){return a-b});

console.log(bigEnough[0])