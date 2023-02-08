const fs = require('fs');
// let input = `5-8
// 0-2
// 4-7`;
let input = fs.readFileSync("advent20.in", { encoding: 'utf-8' });


let ranges = []

input.split("\n").forEach(line => {
    const [start, end] = line.split("-").map(v => parseInt(v));
    // console.log("PROCESSING:", start, end);

    check_range([start, end]);
    ranges.sort((a, b) => a[0] - b[0]);
});

// console.log("RANGES:", ranges);
console.log("LOWEST:", ranges[0][1] + 1);

function check_range([start, end]) {
    let found = false;
    // for (let range of ranges) {
    let i;
    for (i = 0; i < ranges.length; i++) {
        let range = ranges[i];
        if (start >= range[0]) {
            if (start <= (range[1] + 1)) {  // +1 for ranges next to each other.
                if (end <= range[1]) {
                    // Wholy within existing range. Skip.
                    found = true;
                    break;
                }
                else {
                    // Part of existing range, extend the range end.
                    range[1] = end;
                    found = true;
                    break;
                }
            }
        }
        else {
            // start < range[0]
            if (end >= (range[0] - 1)) {  // -1 for ranges next to each other.
                if (end > range[1]) {
                    // Wholy outside of existing range. Replace.
                    range[0] = start;
                    range[1] = end;
                    found = true;
                    break;
                }
                // Part of existing range, extend the range start.
                range[0] = start;
                found = true;
                break;
            }
        }
    }
    if (!found) ranges.push([start, end]);
    else {
        let new_range = ranges.splice(i, 1);
        check_range(new_range[0])
    }
}