const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity
    });
    var max = 0;
    var maxCount = 1;
    var currentElf = 0;
    var count = 1;

    rl.on('line', (line) => {
        if (line == "") {
            console.log("elf number " + count);
            if (currentElf > max) {
                maxCount = count;
                max = currentElf;
            }
            count++
            currentElf = 0;
        } else {
            currentElf += parseInt(line);
        }
        

      //console.log(`Line from file: ${line}`);
    });

    await events.once(rl, 'close');
    console.log("Elf with most: " + maxCount);
    console.log("Calorie count: " + max)

    console.log('Reading file line by line with readline done.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})();