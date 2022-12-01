const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    
    const rl = readline.createInterface({
      input: fs.createReadStream('input.txt'),
      crlfDelay: Infinity
    });
    var topElves = [
        {number: 0, calories: 0},
        {number: 0, calories: 0},
        {number: 0, calories: 0}
    ]

    var currentElfNumber = 1;
    var currentCalories = 0;

    rl.on('line', (line) => {
        if (line == "") {
            console.log("Elf Number " + currentElfNumber);
            if (currentCalories > topElves[0].calories) {
                topElves[0] = {
                    number: currentElfNumber,
                    calories: currentCalories
                };
                topElves.sort(function(a, b){return a.calories - b.calories});
            }
            currentElfNumber++
            currentCalories = 0;
        } else {
            currentCalories += parseInt(line);
        }
        

      //console.log(`Line from file: ${line}`);
    });

    await events.once(rl, 'close');
    console.log("Elves with most: " + topElves);
    var calories = topElves[0].calories+topElves[1].calories+topElves[2].calories;
    console.log("Calorie count: " + calories)

    console.log('Reading file line by line with readline done.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})();