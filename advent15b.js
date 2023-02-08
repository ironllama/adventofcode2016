// const allData = `Disc // 1 has 5 positions; at time=0, it is at position 4.
// Disc // 2 has 2 positions; at time=0, it is at position 1.`

const allData = `Disc #1 has 17 positions; at time=0, it is at position 15.
Disc #2 has 3 positions; at time=0, it is at position 2.
Disc #3 has 19 positions; at time=0, it is at position 4.
Disc #4 has 13 positions; at time=0, it is at position 2.
Disc #5 has 7 positions; at time=0, it is at position 2.
Disc #6 has 5 positions; at time=0, it is at position 0.
Disc #7 has 11 positions; at time=0, it is at position 0.`;

const allLines = allData.split('\n');
const allArr = [];

for (let i = 0; i < allLines.length; i++) {
    const tokens = allLines[i].split(" ");
    const numPos = parseInt(tokens[3]);
    const startPos = parseInt(tokens[11].substring(0, tokens[11].length - 1));
    const startOffset = (numPos - (((i + 1) + startPos) % numPos)) % numPos;
    allArr.push([startOffset, numPos]);
}
// console.log("ALLARR:", allArr)

function* myGen() {
    let i = 0;
    while (true) {
        yield (allArr[0][1] * i) + allArr[0][0];
        i += 1;
    }
}

let final = -1;
for (let i = 0, gen = myGen(); i = gen.next().value;) {
    // console.log("TRYING:", i);
    for (let j = 1; j < allArr.length; j++) {
        // console.log("TEST:", allArr[j][0]);
        if (i % allArr[j][1] !== allArr[j][0]) break;
        else if (j === (allArr.length - 1)) {
            // console.log("FOUND:", i);
            final = i;
        }
    }
    if (final !== -1) break;
}

console.log("FINAL:", final)
