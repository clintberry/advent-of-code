const fs = require('fs');
const { type } = require('os');

var lines = fs.readFileSync('input.txt').toString().split("\n");

var trees = []

// Parse input data to matrix
for(i in lines) {
    trees[i] = []
    for (j in lines[i]) {
        trees[i][j] = parseInt(lines[i][j])
    }
}

//console.log(trees)

var visibleTrees = 0;
var visibleTreeMap = []
for (i in trees){
    visibleTreeMap[i] = []
    for (j in trees[i]){
        if (checkIsVisible(i, j)){
            visibleTrees++;
            visibleTreeMap[i][j] = 1;
        }
        else {
            visibleTreeMap[i][j] = 0;
        }
    }
    //console.log(visibleTrees)
    //console.log(visibleTreeMap[i].join(''))
}

console.log(visibleTrees)

function checkIsVisible(i, j) {
    i = parseInt(i); //fu** me... why are these strings...
    j = parseInt(j);
    var debug = false;
    // if (i == 1 && j == 10){
    //     console.log('debug on for 1,10', typeof(i), typeof(j))
    //     debug = true;
    // }
    // if row is zero, or last row, auto increment visible trees
    if (i == 0 || i == trees.length - 1) {
        if (debug) {console.log('row is zero or last row')}
        return true;
    }
    // if column is zero, or last column, auto increment visible trees
    if (j == 0 || j == trees[i].length - 1) {
        if (debug) {console.log('column is zero or last column')}
        return true;
    }

    var visibleTop = true;
    // Check if all trees above it are smaller
    for (k = i-1; k >= 0; k--){
        if (trees[k][j] >= trees[i][j]){
            visibleTop = false;
            break;
        }
    }
    if (debug) {console.log('visibleTop: ' + visibleTop)}

    var visibleBottom = true;
    // Check if all trees below it are smaller
    for (k = i+1; k < trees.length; k++){
        if (trees[k][j] >= trees[i][j]){
            visibleBottom = false;
            break;
        }
    }

    if(debug) {console.log('visibleBottom: ' + visibleBottom)}

    var visibleLeft = true;
    // Check if all trees to left are smaller
    for (k = j-1; k >= 0; k--){
        if (trees[i][k] >= trees[i][j]){
            visibleLeft = false;
            break;
        }
    }

    if(debug) {console.log('visibleLeft: ' + visibleLeft)}

    var visibleRight = true;

    //if (debug) {console.log('trees[i].length: ' + trees[i].length)}
    // Check if all trees to right are smaller
    if (debug) console.log('j: ' + j, 'i: ' + i, 'trees[i].length: ' + trees[i].length)
    for (k = j+1; k < trees[i].length; k++){
        if (debug) console.log(trees[i][k])
        if (trees[i][k] >= trees[i][j]){
            if (debug) {console.log('trees[i][k]: ' + trees[i][k])}
            visibleRight = false;
            break;
        }
    }

    if(debug) console.log('visibleRight: ' + visibleRight)

    if (visibleTop || visibleBottom || visibleLeft || visibleRight){
        return true;
    }


    return false;
}

// Part 2

maxScore = 0;

for (i in trees){
    for (j in trees[i]){
        var scenicScore = getScenicScore(i,j);
        if (scenicScore > maxScore){
            maxScore = scenicScore;
        }
    }
}

console.log(maxScore)

function getScenicScore(i,j) {
    i = parseInt(i); 
    j = parseInt(j); 

    var top = 0;
    var bottom = 0;
    var left = 0;
    var right = 0;

    // Calculate visible trees above
    if (i == 0) {
        top = 0;
    }
    else {
        for (k = i-1; k >= 0; k--){
            top++;
            if (trees[k][j] >= trees[i][j]){
                break;
            }
        }
    }
    // Calculate visible trees below
    if (i == trees.length - 1) {
        bottom = 0;
    }
    else {
        for (k = i+1; k < trees.length; k++){
            bottom++;
            if (trees[k][j] >= trees[i][j]){
                break;
            }
        }
    }
    // Calculate visible trees to left
    if (j == 0) {
        left = 0;
    }
    else {
        for (k = j-1; k >= 0; k--){
            left++;
            if (trees[i][k] >= trees[i][j]){
                break;
            }
        }
    }
    // Calculate visible trees to right
    if (j == trees[i].length - 1) {
        right = 0;
    }
    else {
        for (k = j+1; k < trees[i].length; k++){
            right++;
            if (trees[i][k] >= trees[i][j]){
                break;
            }
        }
    }

    return top * bottom * left * right;

}