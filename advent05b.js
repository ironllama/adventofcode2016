const md5 = require("./advent05a-md5.js").md5;

//const input = 'abc';
const input = 'abbhdwsy';
let pass = ["_", "_", "_", "_", "_", "_", "_", "_"];

//console.log("TEST: " + md5('abc3231929').substr(0,5));
for (let i = 0; i < 100000000 && pass.includes("_"); i++){
    const newCombo = input + i;
    const newMD5 = md5(newCombo);
    
    //process.stdout.clearLine();
    //process.stdout.cursorTo(0);
    //process.stdout.write("Testing [" + newCombo + "]");
    
    if (newMD5.substr(0,5) === '00000')
    {
        const newPos = newMD5.substr(5,1);
        if (!isNaN(parseFloat(newPos)) && isFinite(newPos) && newPos < 8 && pass[newPos] === "_"){
            pass[newPos] = newMD5.substr(6,1);
            console.log("FOUND: [" + i + "][" + pass.join("") + "]: " + newMD5);
        }
    }
}

console.log("PASSWORD: [" + pass.join("") + "]");
