// const numPlayers = 5;
// const numPlayers = 9;
const numPlayers = 3004953;

// Initialize the setup.
let seats = [];
for (let i = 0; i < numPlayers; i++) { seats.push(i + 1); }

let iter = 1;
while (seats.length > 1) {
    let tempArr = [];
    for (let i = 0; i < seats.length; i++) {
        tempArr.push(seats[i]);  // Add the current item.
        i++; // Prepare to skip the next one.
        if (i >= seats.length) tempArr.splice(0, 1);  // If there is a last seat with no one to strip after it, remove the first one.
        iter++;  // Advance the iterator for num times executed.
    }
    seats = tempArr;  // Replace current state of seats.
    //console.log("CURR:", seats);
}

console.log("FINAL:", seats, "PRESENTS:", iter);