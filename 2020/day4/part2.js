const fs = require('fs');
const { parse } = require('path');
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
                //console.log(cp)
                return;
            }
            switch(key){
                case "byr":
                    byrint = parseInt(cp[key])
                    if (byrint<1920 || byrint>2002) {
                        valid = false;
                    }
                    break;
                case "iyr":
                    byrint = parseInt(cp[key])
                    if (byrint<2010 || byrint>2020) {
                        valid = false;
                    } 
                    break; 
                case "eyr":
                    byrint = parseInt(cp[key])
                    if (byrint<2020 || byrint>2030) {
                        valid = false;
                    } 
                    break; 
                case "hgt":
                    var unit = cp[key].slice(-2);
                    //console.log(unit)
                    var m = parseInt(cp[key].slice(0, -2));
                    //console.log(m)
                    if (unit == "cm" && (m>=150 && m<=193)) {
                        break
                    }
                    else if (unit == "in" && (m>=59 && m<=76)) {
                        break;
                    }
                    valid=false;
                    break; 
                case "hcl":
                    if (cp[key].length != 7) {
                        valid = false;
                        break;
                    }
                    var hexval = "0x" + cp[key].slice(1)
                    var i = parseInt(hexval,16)
                    if (i == NaN) {
                        valid = flase;
                    }
                    break; 
                case "ecl":
                    switch (cp[key]){
                        case "amb": break; 
                        case "blu": break; 
                        case "brn": break; 
                        case "gry": break; 
                        case "grn": break; 
                        case "hzl": break; 
                        case "oth": break;
                        default:
                            valid = false;
                    }
                    break; 
                case "pid":
                    var pattern = new RegExp("^\\d{9}$");
                    if (pattern.test(cp[key]) == false){
                        valid = false;
                    }
                    break;  
            }
        });
        if (valid == true) {
            count++;
        }
    })
    
    console.log(count)
});