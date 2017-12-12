//const allData = [
//    'rect 3x2'
//    , 'rotate column x=1 by 1'
//    , 'rotate row y=0 by 4'
//    , 'rotate column x=1 by 1'
//];

const allData = [
    'rect 1x1'
    , 'rotate row y=0 by 5'
    , 'rect 1x1'
    , 'rotate row y=0 by 5'
    , 'rect 1x1'
    , 'rotate row y=0 by 5'
    , 'rect 1x1'
    , 'rotate row y=0 by 5'
    , 'rect 1x1'
    , 'rotate row y=0 by 2'
    , 'rect 1x1'
    , 'rotate row y=0 by 2'
    , 'rect 1x1'
    , 'rotate row y=0 by 3'
    , 'rect 1x1'
    , 'rotate row y=0 by 3'
    , 'rect 2x1'
    , 'rotate row y=0 by 2'
    , 'rect 1x1'
    , 'rotate row y=0 by 3'
    , 'rect 2x1'
    , 'rotate row y=0 by 2'
    , 'rect 1x1'
    , 'rotate row y=0 by 3'
    , 'rect 2x1'
    , 'rotate row y=0 by 5'
    , 'rect 4x1'
    , 'rotate row y=0 by 5'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=0 by 10'
    , 'rotate column x=5 by 2'
    , 'rotate column x=0 by 1'
    , 'rect 9x1'
    , 'rotate row y=2 by 5'
    , 'rotate row y=0 by 5'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=2 by 5'
    , 'rotate row y=0 by 5'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate column x=40 by 1'
    , 'rotate column x=27 by 1'
    , 'rotate column x=22 by 1'
    , 'rotate column x=17 by 1'
    , 'rotate column x=12 by 1'
    , 'rotate column x=7 by 1'
    , 'rotate column x=2 by 1'
    , 'rotate row y=2 by 5'
    , 'rotate row y=1 by 3'
    , 'rotate row y=0 by 5'
    , 'rect 1x3'
    , 'rotate row y=2 by 10'
    , 'rotate row y=1 by 7'
    , 'rotate row y=0 by 2'
    , 'rotate column x=3 by 2'
    , 'rotate column x=2 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=2 by 5'
    , 'rotate row y=1 by 3'
    , 'rotate row y=0 by 3'
    , 'rect 1x3'
    , 'rotate column x=45 by 1'
    , 'rotate row y=2 by 7'
    , 'rotate row y=1 by 10'
    , 'rotate row y=0 by 2'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 2'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=2 by 13'
    , 'rotate row y=0 by 5'
    , 'rotate column x=3 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=3 by 10'
    , 'rotate row y=2 by 10'
    , 'rotate row y=0 by 5'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=3 by 8'
    , 'rotate row y=0 by 5'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 4x1'
    , 'rotate row y=3 by 17'
    , 'rotate row y=2 by 20'
    , 'rotate row y=0 by 15'
    , 'rotate column x=13 by 1'
    , 'rotate column x=12 by 3'
    , 'rotate column x=10 by 1'
    , 'rotate column x=8 by 1'
    , 'rotate column x=7 by 2'
    , 'rotate column x=6 by 1'
    , 'rotate column x=5 by 1'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 2'
    , 'rotate column x=0 by 1'
    , 'rect 14x1'
    , 'rotate row y=1 by 47'
    , 'rotate column x=9 by 1'
    , 'rotate column x=4 by 1'
    , 'rotate row y=3 by 3'
    , 'rotate row y=2 by 10'
    , 'rotate row y=1 by 8'
    , 'rotate row y=0 by 5'
    , 'rotate column x=2 by 2'
    , 'rotate column x=0 by 2'
    , 'rect 3x2'
    , 'rotate row y=3 by 12'
    , 'rotate row y=2 by 10'
    , 'rotate row y=0 by 10'
    , 'rotate column x=8 by 1'
    , 'rotate column x=7 by 3'
    , 'rotate column x=5 by 1'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 1'
    , 'rotate column x=1 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 9x1'
    , 'rotate row y=0 by 20'
    , 'rotate column x=46 by 1'
    , 'rotate row y=4 by 17'
    , 'rotate row y=3 by 10'
    , 'rotate row y=2 by 10'
    , 'rotate row y=1 by 5'
    , 'rotate column x=8 by 1'
    , 'rotate column x=7 by 1'
    , 'rotate column x=6 by 1'
    , 'rotate column x=5 by 1'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 2'
    , 'rotate column x=1 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 9x1'
    , 'rotate column x=32 by 4'
    , 'rotate row y=4 by 33'
    , 'rotate row y=3 by 5'
    , 'rotate row y=2 by 15'
    , 'rotate row y=0 by 15'
    , 'rotate column x=13 by 1'
    , 'rotate column x=12 by 3'
    , 'rotate column x=10 by 1'
    , 'rotate column x=8 by 1'
    , 'rotate column x=7 by 2'
    , 'rotate column x=6 by 1'
    , 'rotate column x=5 by 1'
    , 'rotate column x=3 by 1'
    , 'rotate column x=2 by 1'
    , 'rotate column x=1 by 1'
    , 'rotate column x=0 by 1'
    , 'rect 14x1'
    , 'rotate column x=39 by 3'
    , 'rotate column x=35 by 4'
    , 'rotate column x=20 by 4'
    , 'rotate column x=19 by 3'
    , 'rotate column x=10 by 4'
    , 'rotate column x=9 by 3'
    , 'rotate column x=8 by 3'
    , 'rotate column x=5 by 4'
    , 'rotate column x=4 by 3'
    , 'rotate row y=5 by 5'
    , 'rotate row y=4 by 5'
    , 'rotate row y=3 by 33'
    , 'rotate row y=1 by 30'
    , 'rotate column x=48 by 1'
    , 'rotate column x=47 by 5'
    , 'rotate column x=46 by 5'
    , 'rotate column x=45 by 1'
    , 'rotate column x=43 by 1'
    , 'rotate column x=38 by 3'
    , 'rotate column x=37 by 3'
    , 'rotate column x=36 by 5'
    , 'rotate column x=35 by 1'
    , 'rotate column x=33 by 1'
    , 'rotate column x=32 by 5'
    , 'rotate column x=31 by 5'
    , 'rotate column x=30 by 1'
    , 'rotate column x=23 by 4'
    , 'rotate column x=22 by 3'
    , 'rotate column x=21 by 3'
    , 'rotate column x=20 by 1'
    , 'rotate column x=12 by 2'
    , 'rotate column x=11 by 2'
    , 'rotate column x=3 by 5'
    , 'rotate column x=2 by 5'
    , 'rotate column x=1 by 3'
    , 'rotate column x=0 by 4'
]

//let row0 = [];
//let row1 = [];
//let row2 = [];
//let row3 = [];
//let row4 = [];
//let row4 = [];
let rows = [[], [], [], [], [], []];
for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < 50; j++) rows[i].push(".");
}
//for (let i = 0; i < rows.length; i++) { console.log(rows[i].join('')); }

for (let i = 0; i < allData.length; i++) {
    const tokens = allData[i].split(' ');
    if (tokens[0] === 'rect') {
        const para = tokens[1].split('x');
        rect(parseInt(para[0]), parseInt(para[1]));
    }
    else if (tokens[0] === 'rotate') {
        const dim = tokens[2].split('=');
        if (tokens[1] === 'row') {
            rotate_row(parseInt(dim[1]), parseInt(tokens[4]));
        }
        else if (tokens[1] === 'column') {
            rotate_col(parseInt(dim[1]), parseInt(tokens[4]));
        }
    }
}

let totalLit = 0;
for (let i = 0; i < rows.length; i++) {
    console.log(rows[i].join(''));
    for (let j = 0; j < rows[i].length; j++) if (rows[i][j] === '#') totalLit++;
}
console.log("TOTAL LIT: " + totalLit);


function rect(x, y) {
    for (let i = 0; i < x; i++) {
        rows[0][i] = "#";
        rows[y-1][i] = "#";
    }
    for (let j = 0; j < y; j++) {
        rows[j][0] = "#";
        rows[j][x-1] = '#';
    }
}

function rotate_row(y, n) {
    const buffer = [];
    for (let i = 0; i < rows[0].length; i++) buffer.push(".");
    
    for (let i = 0; i < rows[0].length; i++) {
        buffer[(n+i) % rows[0].length] = rows[y][i];
        //console.log("moving: " + rows[y][i] + " from " + i + " to " + (n+i) % rows[0].length + " with n+1: " + (n+1) + " and modulus: " + (n+1) % 50);
    }
    rows[y] = buffer;
}

function rotate_col(x, n) {
    const buffer = [];
    for (let i = 0; i < rows.length; i++) buffer.push(".");

    for (let i = 0; i < buffer.length; i++) {
        buffer[(n+i) % buffer.length] = rows[i][x];
        //console.log("moving: " + rows[i][x] + " from " + i + " to " + (n+i) % buffer.length + " with n+1: " + (n+1) + " and modulus: " + (n+1) % 6);
    }
    for (let i = 0; i < buffer.length; i++){
        rows[i][x] = buffer[i];
    }
}