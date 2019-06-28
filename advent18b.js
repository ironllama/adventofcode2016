// let allRows = ['..^^.'];
// let allRows = ['.^^.^.^^^^'];
let allRows = ['.^^^^^.^^.^^^.^...^..^^.^.^..^^^^^^^^^^..^...^^.^..^^^^..^^^^...^.^.^^^^^^^^....^..^^^^^^.^^^.^^^.^^'];

// Generate new rows.
let referenceRow = 0;
while (allRows.length < 400000) {
    let newRow = '';
    // console.log("ROW:", allRows[referenceRow]);
    for (let col = 0; col < allRows[0].length; col++) {
        // To get the status of the current tile, instead of getting all the previous row's tiles and then going
        // through a logic tree to determine state and then ultimately status, we're going to try to shortcut it.
        // I noticed that the middle one is unnecessary to check. Really, the ends just need to be different.

        // console.log("CHECK: LEFT:", (col > 0) ? allRows[referenceRow][col - 1] : ".", "RIGHT:", (col < (allRows[0].length - 1)) ? allRows[referenceRow][col + 1] : ".");
        let leftSafe = true;
        if (col > 0 && allRows[referenceRow][col - 1] === '^') leftSafe = false;

        let rightSafe = true;
        if (col < (allRows[0].length - 1) && allRows[referenceRow][col + 1] === '^') rightSafe = false;

        if (leftSafe === rightSafe) newRow += "."
        else newRow += "^"
    }
    allRows.push(newRow);
    referenceRow++;
}

// Count safe squares.
let totalSafe = 0;
for (let i = 0; i < allRows.length; i++) {
    for (let k = 0; k < allRows[i].length; k++) {
        if (allRows[i][k] === '.') totalSafe++;
    }
}

// console.log("allRows:", allRows);

console.log("FINISHED:", totalSafe);