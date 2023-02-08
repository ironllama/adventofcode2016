// allData = `cpy 41 a
// inc a
// inc a
// dec a
// jnz a 2
// dec a`;

allData = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 14 c
cpy 14 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;

allDataList = allData.split('\n')
const myReg = { 'a': 0, 'b': 0, 'c': 0, 'd': 0 };
let i = 0;

while (i < allDataList.length) {
    // console.log("CURR:", allDataList[i], "ITER:", i);
    // console.log("REG:", myReg);
    const tokens = allDataList[i].split(" ");
    if (tokens[0] === 'cpy') {
        if (!isNaN(tokens[1])) myReg[tokens[2]] = parseInt(tokens[1]);
        else myReg[tokens[2]] = myReg[tokens[1]];
    }
    else if (tokens[0] === 'inc') myReg[tokens[1]] += 1;
    else if (tokens[0] === 'dec') myReg[tokens[1]] -= 1;
    else if (tokens[0] === 'jnz') {
        if (!isNaN(tokens[1]) && parseInt(tokens[1]) !== 0) i += (parseInt(tokens[2]) - 1);
        else if (myReg[tokens[1]] != 0) i += (parseInt(tokens[2]) - 1);
    }
    i += 1;
}

// console.log("REG:", myReg);
console.log("A:", myReg.a);
