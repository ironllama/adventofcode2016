//dim = [10, 7]
//fav = 10
//dest = [7, 4]

const dim = [40, 45];
const fav = 1350;
const dest = [31, 39];

const start = [1, 1];
let mapo = [];

// let shortest = Infinity;
const allMatches = []

for (let y = 0; y < dim[1]; y++) {
    mapo.push([])
    for (let x = 0; x < dim[0]; x++) {
        //if (x == 0) console.log(y % 10, end="");
        const decNum = ((x * x) + (x * 3) + (2 * x * y) + y + (y * y)) + fav;
        const numOnes = decNum.toString(2).split("").reduce((a, v) => v === '1' ? a + 1 : a, 0);
        let tile = '';
        if ((numOnes % 2) == 0) tile = '.';
        else tile = '#';
        mapo[y].push(tile);
        //mapo.push({ 'x': x, 'y': y, 'tile': tile });
        //console.log(tile);
        //console.log('');
    }
}

// Deep copy an Array.
function clone(arr) { return arr.map(item => Array.isArray(item) ? clone(item) : item) }

function findEnd(curry, currx, mapo) {
    const newMapo = clone(mapo);
    newMapo[curry][currx] = 'O';

    let thisLen = 0
    for (let y = 0; y < dim[1]; y++)
        for (let x = 0; x < dim[0]; x++)
            if (mapo[y][x] == 'O') thisLen += 1;
    if (thisLen <= 50) {
        if (allMatches.indexOf(currx + ',' + curry) === -1)
            allMatches.push(currx + ',' + curry);

        // if (currx == dest[0] && curry == dest[1]) theEnd(newMapo);
        if ((curry + 1) < dim[1] && mapo[curry + 1][currx] !== '#' && mapo[curry + 1][currx] != 'O') findEnd(curry + 1, currx, newMapo);
        if ((curry - 1) >= 0 && mapo[curry - 1][currx] !== '#' && mapo[curry - 1][currx] != 'O') findEnd(curry - 1, currx, newMapo);
        if ((currx + 1) < dim[0] && mapo[curry][currx + 1] !== '#' && mapo[curry][currx + 1] != 'O') findEnd(curry, currx + 1, newMapo);
        if ((currx - 1) >= 0 && mapo[curry][currx - 1] !== '#' && mapo[curry][currx - 1] != 'O') findEnd(curry, currx - 1, newMapo);
    }
}

findEnd(start[1], start[0], mapo);

console.log("TOTAL: ", allMatches.length);