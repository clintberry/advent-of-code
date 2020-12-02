const readline = require('readline');
const fs = require('fs');

var numbers = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: false,
    console: false
});

readInterface.on('line', function(line) {
    numbers.push(parseInt(line));
});

readInterface.on('close', function(){
    numbers.forEach(num1 => {
        numbers.forEach(num2 => {
            //part 1
            // if (num1+num2 == 2020) {
            //     console.log(num1, " ", num2, " ", num1*num2)
            // }
            numbers.forEach(num3 => {
                if (num1+num2+num3 == 2020) {
                    console.log(num1, " ", num2, " ", num3, " ", num1*num2*num3)
                }
            })
        })
    });
})

