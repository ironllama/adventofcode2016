const md5 = require("./MD5.js").md5;

const salt = "zpqevtbw"
const addCheck = {}
const final = []

function inAddCheck(match, idx) {
    const results = [];
    for (let [k, v] of Object.entries(addCheck)) {
        // if k == 792: console.log("COMPARE:", k, idx, (idx-k), v[0], match)
        if (idx === 771) console.log("COMPARE:", k, idx, (idx - k), v[0], match);
        if ((idx - k) <= 1000 && v[0] == match) results.push(k);
    }
    return results;
}

let i = 0
while (true) {
    const totalSalt = salt + i;
    const hash = md5(totalSalt);
    const threeMatch = hash.match(/([a-z0-9])\1\1/i);
    if (threeMatch) {
        const threeStr = threeMatch[0];
        //console.log ("THREE:", totalSalt, threeStr, hash) // Store these

        const fiveMatch = hash.match(/([a-z0-9])\1\1\1\1/i);
        if (fiveMatch) {
            const fiveToThreeStr = fiveMatch[0].substring(0, 3);
            //console.log("FIVE:", fiveToThreeStr);
            const threeKey = inAddCheck(fiveToThreeStr, i);
            if (threeKey.length > 0) {
                for (let thisKey of threeKey) {
                    final.push([threeStr, thisKey, addCheck[thisKey][1], i, hash]);
                    //console.log("FOUND:", threeStr, threeKey, addCheck[threeKey][1], i, hash)
                    if (final.length == 64) {
                        //console.log("END REACHED!")
                        break;
                    }
                }
                if (final.length == 64) break;
            }
        }
        addCheck[i] = [threeStr, hash];
    }
    i += 1;
}

//console.log("ADDCHECK: ")
//for k, v in addCheck.items(): console.log(k, v)

// for (let idx in final) console.log(idx, final[idx]);
console.log("FINAL:", final[final.length - 1][1]);
