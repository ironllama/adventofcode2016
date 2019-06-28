const md5 = require("./advent05a-md5.js").md5;

// const puzzleInput = "hijkl";
// const puzzleInput = "ihgpwlah";
// const puzzleInput = "kglvqrro";
// const puzzleInput = "ulqzkmiv";
const puzzleInput = "pxxbnzuo";

const numRows = 4;
const numCols = 4;

let solutions = [];

function isOpen(inStr) {
    if (isNaN(inStr) && inStr !== 'a') return true;
    else return false;
}

function processRoom(trail, currRow, currCol) {
    // console.log("CHECKING:", currRow, currCol);

    // Check to see if we've reached our goal.
    if (currRow === (numRows - 1) && currCol === (numCols - 1)) {
        // console.log("GOAL:", trail);
        // process.exit(); // Meh. Ugly, but whatever.
        solutions.push(trail);
        return;
    }

    // Hash the current combo;
    let newHashPrefix = md5(puzzleInput + trail).substr(0, 4);
    // console.log("newHashPrefix:", newHashPrefix);

    // First, check up, if not at the top row.
    if (currRow > 0) {
        if (isOpen(newHashPrefix[0])) processRoom(trail + 'U', currRow - 1, currCol);
    }
    if (currRow < (numCols - 1)) {
        if (isOpen(newHashPrefix[1])) processRoom(trail + 'D', currRow + 1, currCol);
    }
    if (currCol > 0) {
        if (isOpen(newHashPrefix[2])) processRoom(trail + 'L', currRow, currCol - 1);
    }
    if (currCol < (numCols - 1)) {
        if (isOpen(newHashPrefix[3])) processRoom(trail + 'R', currRow, currCol + 1);
    }
}

processRoom("", 0, 0);

// let shortest = solutions[0];
// for (let i = 1; i < solutions.length; i++) {
//     if (solutions[i].length < shortest.length) shortest = solutions[i];
// }

// console.log("FINISHED:", shortest);

let longest = 0;
for (let i = 0; i < solutions.length; i++) {
    if (solutions[i].length > longest) longest = solutions[i].length;
}

console.log("FINISHED:", longest);