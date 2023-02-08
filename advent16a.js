// initial = "10000"
// initLen = 20

let initial = "00111101111101000";
const initLen = 272;

while (initial.length < initLen) {
    let reverse = initial.split("").reverse();
    reverse = reverse.map(c => 1 - parseInt(c)).join("");
    initial = initial + '0' + reverse;
}
initial = initial.substring(0, initLen);
// console.log("INITIAL:", initial)

let numPair = 2
while (initial.length % 2 !== 1) {
    const pairs = [];
    for (let i = 0; i < initial.length; i += 2) pairs.push(initial.substring(i, i + numPair));
    // print("PAIRS:", pairs)
    initial = '';
    for (i of pairs) {
        // print("TEST:", i[0], i[1])
        if (i[0] === i[1]) initial += '1';
        else initial += '0';
    }
    // print("CHECKSUM:", initial)
}

console.log("FINAL:", initial);
