function doStuff(numPlayers) {

    let seats = [];
    for (let i = 0; i < numPlayers; i++) { seats.push(i + 1); }

    let nextElf = 0;
    while (seats.length > 1) {

        // Naive way -- takes too long, about 8.3 hours for 3mil elves.
        // // Find out who we're stealing from.
        // let halfPos = Math.floor(seats.length / 2);
        // let stealsFrom = (nextElf + halfPos) % seats.length;
        // // console.log("TURN:", seats[nextElf], "HALFPOS:", halfPos, "STEALSFROM:", seats[stealsFrom]);

        // seats.splice(stealsFrom, 1);  // Readjust the circle after removing.
        // if (stealsFrom > nextElf) nextElf++;  // Next elf's turn. Unless we removed from behind the current elf, in which case the index is the same.
        // else nextElf = nextElf % seats.length;  // Mod, in case we've reduced past the size of the circle.

        // Filtering out the latter half of the structure at once.
        const overallSize = seats.length;
        const latterHalf = seats.splice(Math.floor(seats.length / 2));
        const tempArr = [];
        nextElf = 0;

        if (overallSize % 2 === 0 && seats.length > 1) { nextElf += 2; }
        else { nextElf += 1 };
        // console.log("NEXTELF:", nextElf, "SEATS:", seats.length);

        for (let i = nextElf; i < latterHalf.length && tempArr.length < seats.length; i++) {
            tempArr.push(latterHalf[i]);
            i += 2;
        }
        // seats = seats.concat(tempArr);
        let unprocessedFormerHalf = seats.splice(latterHalf.length - tempArr.length);
        // console.log("JOIN:", "UFH:", unprocessedFormerHalf, "TEMPARR:", tempArr, "SEATS:", seats);
        seats = unprocessedFormerHalf.concat(tempArr, seats);

        // console.log("CURR:", seats);
        // console.log("CURR:", seats.length);
    }

    return seats;
}

// console.log("FINAL 1:", doStuff(1));  // 1
// console.log("FINAL 2:", doStuff(2));  // 1
// console.log("FINAL 3:", doStuff(3));  // 3
// console.log("FINAL 4:", doStuff(4));  // 1
// console.log("FINAL 5:", doStuff(5));  // 2
// console.log("FINAL 6:", doStuff(6));  // 3
// console.log("FINAL 7:", doStuff(7));  // 5
// console.log("FINAL 8:", doStuff(8));  // 7
// console.log("FINAL 9:", doStuff(9));  // 9
// console.log("FINAL 10:", doStuff(10));  // 1
// console.log("FINAL 11:", doStuff(10));  // 2
console.log("FINAL 3004953:", doStuff(3004953));
