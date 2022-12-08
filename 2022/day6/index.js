const fs = require('fs');

var signal = fs.readFileSync('input.txt').toString()

// Brute force method
// Iterate over characters in signal
for (i=0; i<signal.length; i++) {
    //console.log(signal[i])
    if (i < 4) continue;
    // Check if the current character is different from the previous 3
    if (signal[i] != signal[i-1] && signal[i] != signal[i-2] && signal[i] != signal[i-3]) {
        // Check if previous character is different then the two before it
        if (signal[i-1] != signal[i-2] && signal[i-1] != signal[i-3]) {
            // Check if the character before the previous one is different from the one before that
            if (signal[i-2] != signal[i-3]) {
                console.log("Found a match! " + i)
                break
            }
        }
    }
}

// Magic regex I found on stack overflow for part 2
//https://stackoverflow.com/questions/12870489/regex-to-match-a-word-with-unique-non-repeating-characters

for (j=0; j<signal.length; j++) {
    //console.log(signal[j])
    if (j < 14) continue;
    var fourchars = signal.substring(j-14, j)
    var reg = /^(?:([A-Za-z])(?!.*\1))*$/;
    if (reg.test(fourchars)) {
        console.log("Found a match! " + j)
        break
    }
}


