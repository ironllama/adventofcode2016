// const lines = require('fs').readFileSync('advent21.ex', { encoding: 'utf-8' }).split("\n");
// const starting = 'abcde';

const lines = require('fs').readFileSync('advent21.in', { encoding: 'utf-8' }).split("\n");
const starting = 'abcdefgh';

let starting_arr = starting.split("");

let temp = '';
let posA = 0;
let posB = 0;
lines.forEach(line => {
    const words = line.split(" ");

    switch (words[0]) {
        case 'swap':
            switch (words[1]) {
                case 'position':
                    temp = starting_arr[words[2]];
                    starting_arr[words[2]] = starting_arr[words[words.length - 1]];
                    starting_arr[words[words.length - 1]] = temp;
                    break;
                case 'letter':
                    posA = starting_arr.indexOf(words[2]);
                    posB = starting_arr.indexOf(words[words.length - 1]);
                    temp = starting_arr[posA];
                    starting_arr[posA] = starting_arr[posB];
                    starting_arr[posB] = temp;
                    break;
                default:
                    console.log("UNKNOWN swap[1]: ", words[1]);
            }
            break;
        case 'move':
            posA = words[2];
            posB = words[words.length - 1];
            temp = starting_arr.splice(posA, 1);
            starting_arr.splice(posB, 0, ...temp);
            break;
        case 'rotate':
            switch (words[1]) {
                case 'left':
                    temp = starting_arr.splice(words[2], starting_arr.length - words[2]);
                    starting_arr = temp.concat(starting_arr);
                    break;
                case 'right':
                    temp = starting_arr.splice(starting_arr.length - words[2], words[2]);
                    starting_arr = temp.concat(starting_arr);
                    break;
                case 'based':
                    posA = starting_arr.indexOf(words[words.length - 1]);
                    if (posA >= 4) posA += 2;
                    else posA += 1;
                    posA = posA % starting_arr.length;
                    temp = starting_arr.splice(starting_arr.length - posA, posA);
                    starting_arr = temp.concat(starting_arr);
                    break;
                default:
                    console.log("UNKNOWN rotate[1]: ", words[1]);
            }
            break;
        case 'reverse':
            posA = words[2];
            posB = words[words.length - 1];
            temp = starting_arr.slice(posA, parseInt(posB) + 1);
            temp.reverse();
            starting_arr.splice(posA, temp.length, ...temp);
            break;
        default:
            console.log("UNKNOWN words[0]: ", words[0]);
    }

    // console.log("LINE:", line, starting_arr);
});

console.log("FINISHED:", starting_arr.join(""));
