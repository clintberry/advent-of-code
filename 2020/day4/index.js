const fs = require('fs');
const readline = require('readline');

var data = [];

var passport = {
    byr: "",
    iyr: "",
    eyr: "",
    hgt: "",
    hcl: "",
    ecl: "",
    pid: "",
    //cid: "",
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});


var currentPassport = Object.create(passport);

lineReader.on('line', function (line) {
    if (line == "") {
        data.push(currentPassport)
        currentPassport = Object.create(passport);
        return;
    }
    rows = line.split(" ")
    if (rows.length > 1) {
        rows.forEach(function(kvp) {
            kv = kvp.split(":") 
            currentPassport[kv[0]] = kv[1];
        })
    } else {
        kv = line.split(":")
        currentPassport[kv[0]] = kv[1];
        //console.log(currentPassport)
    }
    
});

lineReader.on('close', function(){
    data.push(currentPassport) 
    //console.log(data)
    var count = 0;
    data.forEach(function(cp){
        var valid = true;
        Object.keys(passport).forEach(key => {
            if (key == "cid")  {
                return;
            }
            if(cp[key] == "") {
                valid = false;
                console.log(cp)
            }
        });
        if (valid == true) {
            count++;
        }
    })
    
    console.log(count)
});