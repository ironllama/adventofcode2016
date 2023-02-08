let allDataList = require('fs').readFileSync('advent25.in', { encoding: 'utf-8' }).split('\n');
const myReg = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };

let previous = -1;
let num_signals = 0;
const num_limit = 9;  // Seems this is the lowest limit to still get the right answer?

let num_a = 0;
outer:
while (true) {
    myReg.a = num_a;
    // console.log("TEST:", num_a);

    let i = 0;
    inner:
    while (i < allDataList.length) {
        // console.log("CURR:", allDataList[i], "ITER:", i);
        // console.log("REG:", i, myReg);

        const tokens = allDataList[i].split(" ");
        if (tokens[0] === 'cpy') {
            if (myReg.hasOwnProperty(tokens[2])) {  // Second parameter has to be a letter.
                if (!isNaN(tokens[1])) myReg[tokens[2]] = parseInt(tokens[1]);
                else myReg[tokens[2]] = myReg[tokens[1]];
            }
        }
        else if (tokens[0] === 'inc') myReg[tokens[1]] += 1;
        else if (tokens[0] === 'dec') myReg[tokens[1]] -= 1;
        else if (tokens[0] === 'jnz') {
            let first = tokens[1];
            if (!isNaN(first)) first = parseInt(first);
            else first = parseInt(myReg[first]);

            let second = tokens[2];
            if (!isNaN(second)) second = parseInt(second);
            else second = parseInt(myReg[second]);

            if (first !== 0) i += (second - 1);
        }
        else if (tokens[0] === 'tgl') {
            console.log("TGL:", parseInt(myReg[tokens[1]]))
            let new_i = i + parseInt(myReg[tokens[1]]);

            if (new_i > 0 && new_i < allDataList.length) {
                const new_tokens = allDataList[new_i].split(" ");
                // console.log("TGL:", new_i, "LEN:", new_tokens.length);

                if (new_tokens.length === 2) {
                    if (new_tokens[0] === 'inc') new_tokens[0] = 'dec';
                    else new_tokens[0] = 'inc'
                }
                else if (new_tokens.length === 3) {
                    if (new_tokens[0] === 'jnz') new_tokens[0] = 'cpy';
                    else new_tokens[0] = 'jnz';
                }

                allDataList[new_i] = new_tokens.join(" ");
            }
        }
        else if (tokens[0] === 'out') {
            // console.log("OUT:", myReg[tokens[1]]);
            if (myReg[tokens[1]] === previous) {
                num_signals = 0;
                num_a += 1;
                previous = -1;
                break inner;
            }
            else {
                num_signals += 1;
                if (num_signals >= num_limit) {
                    break outer;
                }
                previous = myReg[tokens[1]];
            }
        }
        i += 1;
    }
}

// console.log("REG:", myReg);
// console.log("A:", myReg.a);
console.log("NUM:", num_a);
// 872 H