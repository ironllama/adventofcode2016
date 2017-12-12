const md5 = require("./advent05a-md5.js").md5;

//const input = 'abc';
const input = 'abbhdwsy';
const t0 = new Date();
let pass = "";

//console.log("TEST: " + md5('abc3231929').substr(0,5));
for (let i = 0; i < 10000000 && pass.length < 8; i++){
    const newCombo = input + i;
    const newMD5 = md5(newCombo);
    
    //process.stdout.clearLine();
    //process.stdout.cursorTo(0);
    //process.stdout.write("Testing [" + newCombo + "]");
    
    if (newMD5.substr(0,5) === '00000')
    {
        console.log("FOUND: [" + i + "]: " + newMD5);
        pass += newMD5.substr(5,1);
    }
}

console.log("PASSWORD: [" + pass + "]");
