const fs = require('fs');
const readline = require('readline');

var data = [];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
    //console.log(line)
    data.push(line)
});

lineReader.on('close', function(){
    console.log("starting")
    var trees=0;
    x=0;
    for(var y=0; y<data.length; y++){
        if (x>(data[y].length-1)) {
            x -= data[y].length-1;
        }
        //console.log(x)
        var line = "";
        if (data[y].charAt(x) == "#") {
            trees++;
            line = setCharAt(data[y],x,"X")
        } else {
            line = setCharAt(data[y],x,"O")
        }
        console.log(line)
        
        x+=3
    }
    console.log(trees)
});

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}