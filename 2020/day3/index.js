const { SSL_OP_EPHEMERAL_RSA } = require('constants');
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
    console.log(slope(3,1))
});

function slope(dx,dy) {
    console.log("starting")
    var trees=0;
    x=0;
    for(var y=0; y<data.length; y+=dy){
        if (x>(data[y].length-1)) {
            x -= data[y].length;
        }
        //console.log(x)
        var line = "";
        if (data[y].charAt(x) == "#") {
            trees++;
        }
        x+=dx
    }
    return trees;
}