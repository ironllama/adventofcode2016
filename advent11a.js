// EXAMPLE INPUT
// F4 .  .  .  .  .
// F3 .  .  .  LG .
// F2 .  HG .  .  .
// F1 E  .  HM .  LM

// PUZZLE INPUT
// The first floor contains a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
// The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
// The third floor contains a thulium-compatible microchip.
// The fourth floor contains nothing relevant.

// F4 .  .  .  .  .  .  .  .  .  .  .
// F3 .  .  .  .  .  .  .  .  .  .  TM
// F2 .  .  .  .  .  TG RG RM CG CM .
// F1 E  SG SM PG PM .  .  .  .  .  .

const { MinMaxHeap } = require('./MinMaxHeap.js');
MinMaxHeap.type = 'max';

String.prototype.replaceAt = function (index, replacement) {
    if (typeof replacement !== 'string') replacement = replacement.toString();
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

Array.prototype.equals = function (b) {
    if (this === b) return true;
    if (b == null) return false;
    if (this.length !== b.length) return false;

    // If you don't care about the order of the elements inside the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array. You might want to clone your array first?
    for (var i = 0; i < this.length; ++i) {
        if (this[i] !== b[i]) return false;
    }
    return true;
}

Array.prototype.addHeap = function (state) {
    // let priority = state[2].reduce((acc, val) => acc += parseInt(val), 0);
    let priority = 0;
    for (let i = 0; i < state[2].length; i++) priority += parseInt(state[2][i]);
    priority += 10 * (start_floors.length - state[2].length);
    priority += 100 * (max_iter - state[0]);
    // console.log("PRIORITY:", priority, "STATE:", state);
    MinMaxHeap.push(all_states, [priority, state]);
}

Array.prototype.popHeap = function () {
    return MinMaxHeap.pop(all_states);
}

// Sample.
// const components = ['HG', 'HM', 'LG', 'LM'];
// const start_floors = [2, 1, 3, 1];
// const start_floors = "1020";
// let start_floors = [['HM', 'LM'], ['HG'], ['LG'], []];

// Puzzle input.
// const components = ['SG', 'SM', 'PG', 'PM', 'TG', 'TM', 'RG', 'RM', 'CG', 'CM', 'EG', 'EM', 'DG', 'DM'];
// let start_floors = [1, 1, 1, 1, 2, 3, 2, 2, 2, 2, 1, 1, 1, 1];
let start_floors = "0000121111";

const max_iter = 2 * (start_floors.split("").reduce((a, v) => a += 3 - parseInt(v), 0));
const max_floor = 3;
// let final_floors = Array(start_floors.length).fill(max_floor).join("");
// let final_floors = Array(start_floors.length).fill(max_floor);

const all_states = [];
// all_states.push([0, 0, start_floors]);
all_states.addHeap([0, 0, start_floors]);

const visited = [];


// let next_state = 0;
// while (next_state < all_states.length) {
while (all_states.length > 0) {
    // const curr_state = all_states[next_state];
    const curr_state = all_states.popHeap()[1];
    // console.log("QUEUE SIZE: ", all_states.length, " FLOORS SET: ", all_floors.size);
    // console.log("QUEUE SIZE: ", all_states.length);
    // console.log("NEXT: ", curr_state);

    // Find all legal next moves.
    for (let i = 0; i < curr_state[2].length; i++) {
        if (parseInt(curr_state[2][i]) === curr_state[1]) {  // If the component is on the current floor.
            // if (i % 2 === 0 && parseInt(curr_state[2][i]) === 3) {  // Don't move generators off of the top floor.
            //     continue;
            // }  // No answer?
            let added_neighbor = false;

            // Then try moving a RTC/chip pair.
            if (i % 2 === 0) {  // This is an RTC!
                // Do matching RTC/chip pairs.
                if (curr_state[2][i + 1] === curr_state[2][i]) {
                    // console.log("MOVING PAIR");
                    added_neighbor = add_state(curr_state, [i, i + 1]);
                }
                // Do other RTC pairs
                for (let k = i + 2; k < curr_state[2].length; k += 2) {
                    if (curr_state[2][k] === curr_state[2][i]) {
                        // console.log("MOVING RTCs");
                        added_neighbor = add_state(curr_state, [i, k]);
                    }
                }
            }
            else {  // This is a chip!
                // Do other chip pairs
                for (let k = i + 2; k < curr_state[2].length; k += 2) {
                    if (curr_state[2][k] === curr_state[2][i]) {
                        // console.log("MOVING CHIPS");
                        added_neighbor = add_state(curr_state, [i, k]);
                    }
                }
            }

            // console.log("MOVING ONE");
            if (!added_neighbor) add_state(curr_state, [i]);
        }
    }

    // next_state += 1;
}

function add_state(curr_state, comps_to_move) {
    let [curr_step, curr_floor, comp_floors] = curr_state;
    comp_floors = comp_floors.split("").map(v => parseInt(v));

    let added_neighbor = false;

    if (curr_floor < max_floor
        && curr_step < max_iter  // Don't look beyond reasonable step limits.
    ) {
        // for (let i = 0; i < comps_to_move.length; i++) new_floors[comps_to_move[i]] += 1;
        const new_floors = [...comp_floors];
        for (let i = 0; i < comps_to_move.length; i++) {
            new_floors[comps_to_move[i]] = curr_floor + 1;
        }
        // console.log("NEW: ", new_floors, is_possible(new_floors), has_all_floors(new_floors));

        let num_on_max_floor = new_floors.reduce((a, v) => v === max_floor ? a + 1 : a, 0);
        // console.log("COMP:", new_floors, "COMP_ON_MAX_FLOOR: ", comp_on_max_floor);

        if (num_on_max_floor === new_floors.length) {
            console.log("END: ", curr_step + 1);
            process.exit();
        }

        // Reduce the num components if they've reached end. Save 4 for flexibility.
        if (num_on_max_floor > 4) {
            for (let i = 0; i < new_floors.length - 1; i += 2) {
                if (new_floors[i] === max_floor
                    && new_floors[i + 1] === new_floors[i]) {
                    let removed = new_floors.splice(i, 2);
                    // console.log("REMOVED: ", removed);
                    break;
                }
            }
        }

        // // console.log("COMPARING:", new_floors, "vs", final_floors);
        // if (new_floors === final_floors) {
        //     console.log("END: ", curr_step + 1);
        //     // console.log("NEW_FLOORS:", new_floors);
        //     // process.exit();
        // }

        const new_state = [curr_step + 1, curr_floor + 1, new_floors.join("")];
        if (is_possible(new_floors) && !has_all_floors(new_state)) {
            // console.log("PLUS: ", new_state);
            // all_states.push(new_state);
            all_states.addHeap(new_state);
            visited.push(new_state);
            added_neighbor = true;
        }
    }

    // let rtc_at_max = false;
    // if (comps_to_move[0] % 2 === 0 && comps_to_move[0] === max_floor) {  // RTC
    //     rtc_at_max = true;
    // }

    // Oddly, slower. But more accurate.
    let min_floor_populated = comp_floors.reduce((a, v) => v < a ? v : a, max_floor);

    if (curr_floor > 0
        && curr_step < max_iter  // Don't look beyond reasonable step limits.
        && comps_to_move.length < 2  // Don't take two things down.
        // && comps_to_move[0] % 2 !== 0  // Move only chips down.  // No answer?
        && comp_floors.indexOf(curr_floor - 1) !== -1  // Avoid empty lower floors.
        // && (curr_floor - 1) >= min_floor_populated
        // && !rtc_at_max
    ) {
        const new_floors = [...comp_floors];

        // let changed = false;
        for (let i = 0; i < comps_to_move.length; i++) {
            // if (comps_to_move[i] % 2 !== 0) {  // Only chips can go down.
            new_floors[comps_to_move[i]] = curr_floor - 1;
            break;  // Don't take two things down. (No difference?)
            // changed = true;
            // }
        }
        // console.log("NEW: ", new_floors, is_possible(new_floors), has_all_floors(new_floors));

        // if (changed) {
        const new_state = [curr_step + 1, curr_floor - 1, new_floors.join("")];
        if (is_possible(new_floors) && !has_all_floors(new_state)) {
            // console.log("MINUS: ", new_state);
            // all_states.push(new_state);
            all_states.addHeap(new_state);
            visited.push(new_state);
            added_neighbor = true;
        }
        // }
    }

    return added_neighbor;
}

function has_all_floors(new_state) {
    // for (let k = next_state; k < all_states.length; k++) {
    // for (let k = all_states.length - 1; k >= 0; k--) {
    //     if (all_states[k][2] === new_floors) {
    //         return true;
    //     }
    // }
    for (let k = visited.length - 1; k >= 0; k--) {
        // if (visited[k][2] === new_floors) {
        if (visited[k][0] <= new_state[0]  // Already state w/ less steps.
            && visited[k][1] === new_state[1]  // w/ elevator on same floor.
            && visited[k][2] === new_state[2]  // w/ same RTC/chip setup.
        ) {
            return true;  // Already visited
        }
    }
    return false;
}

function is_possible(new_floors) {
    // console.log("is_possible:", new_floors);
    let valid = true;

    for (let i = 1; valid && i < new_floors.length; i += 2) {  // For each chip
        if (new_floors[i] === new_floors[i - 1]) continue;  // This chip has RTC shielding it on same floor. SAFE!

        // For unshielded chips...
        for (let j = 0; valid && j < new_floors.length - 1; j += 2) {  // For each RTC
            // console.log(`${new_floors[i]} === ${new_floors[j]} => ${new_floors[i] === new_floors[j]}`);
            if (new_floors[i] === new_floors[j]) {  // Unshielded chip and RTC On the same floor
                // console.log("MISMATCH: i:", i, "j:", j, new_floors[i], new_floors[j])
                // return false;  // Bad news.
                valid = false;
            }
        }
    }
    // return true;

    // console.log("is_possible:", new_floors, valid);
    return valid;
}
// // Tests
// // console.log(is_possible(comp_floors));    // true
// // console.log(is_possible([3, 2, 3, 2]));  // true
// // console.log(is_possible([3, 3, 2, 4]));  // true
// // console.log(is_possible([2, 2, 2, 2]));  // true
// // console.log(is_possible([1, 2, 2, 3]));  // false
// // console.log(is_possible([1, 2, 3, 1]));  // false

// let all_states = [];
// function move(curr_floor, in_floors, history) {
//     // console.log("move: in_floors:", in_floors);

//     let new_state = in_floors.join('');
//     if (all_states.includes(new_state)) {
//         return;
//     }
//     else {
//         all_states.push(new_state);
//     }

//     // if (shortest_possible.length > 0) return;

//     if (in_floors.every((v) => v === max_floor)) {
//         console.log("FINISHED!", history.length, history);
//         if (shortest_possible.length === 0 || history.length < shortest_possible.length) {
//             // shortest_possible.push(history);
//             shortest_possible = history;
//         }
//         return;
//     }

//     // Don't every try further if this path is longer than already found shortest path.
//     // if (shortest_possible.length > 0 && history.length > shortest_possible.length) {
//     //     return 0;
//     // }

//     for (let i = 0; i < in_floors.length; i++) {
//         if (in_floors[i] === curr_floor) {
//             if (in_floors[i] < max_floor) {
//                 let new_one_up = in_floors.slice(0);
//                 new_one_up[i] += 1;

//                 for (let j = i + 1; j < in_floors.length; j++) {  // See if another component can also go?
//                     if (in_floors[j] === in_floors[i]) {  // Another component on the same floor?
//                         let new_two_up = new_one_up.slice(0);
//                         new_two_up[j] += 1;
//                         let new_two_history = new_two_up.join('');
//                         if (!history.includes(new_two_history) && is_possible(new_two_up)) move(curr_floor + 1, new_two_up, [...history, new_two_history]);
//                     }
//                 }

//                 let new_one_history = new_one_up.join('');
//                 if (!history.includes(new_one_history) && is_possible(new_one_up)) move(curr_floor + 1, new_one_up, [...history, new_one_history]);
//             }
//             if (in_floors[i] > 1) {
//                 let new_one_down = in_floors.slice(0);
//                 new_one_down[i] -= 1;

//                 for (let j = i + 1; j < in_floors.length; j++) {  // See if another component can also go?
//                     if (in_floors[j] === in_floors[i]) {  // Another component on the same floor?
//                         let new_two_down = new_one_down.slice(0);
//                         new_two_down[j] -= 1;
//                         let new_two_history = new_two_down.join('');
//                         if (!history.includes(new_two_history) && is_possible(new_two_down)) move(curr_floor - 1, new_two_down, [...history, new_two_history]);
//                     }
//                 }

//                 let new_one_history = new_one_down.join('');
//                 if (!history.includes(new_one_history) && is_possible(new_one_down)) move(curr_floor - 1, new_one_down, [...history, new_one_history]);
//             }
//         }
//     }
// }
// move(1, comp_floors, [comp_floors.join('')]);
// console.log("FIN: ", shortest_possible.length, shortest_possible);

// // 319 - HIGH


// // OLD CODE

// let combos = [];

// let startingFloors = [['HM', 'LM'], ['HG'], ['LG'], []];
// // let startingFloors = [['SG', 'SM', 'PG', 'PM'], ['TG', 'RG', 'RM', 'CG', 'CM'], ['TM'], []];
// doSomething(0, startingFloors, 0);

// console.log("END:", combos);


// function findMatchingCompIdx(inComp, inFloor) {
//     // console.log("FIND: COMP:", inComp, "FLOOR:", inFloor);
//     for (let i = 0; i < inFloor.length; i++) {
//         if (inFloor[i][0] === inComp[0]) {
//             // console.log("FIND: COMP1:", inComp[1], "FLOOR1:", inFloor[i][1]);
//             if (inComp[1] === 'G' && inFloor[i][1] === 'M') return i;
//             else if (inComp[1] === 'M' && inFloor[i][1] === 'G') return i;
//         }
//     }
//     return -1;
// }

// function getElevatorPartners(inComp, inFloor) {
//     let returnArr = [-1];  // By self.

//     for (let i = 0; i < inFloor.length; i++) {
//         if (inFloor[i][0] === inComp[0]) returnArr.push(i);  // Same type (Generators or Chips).
//         else if (inFloor[i][1] === inComp[1]) returnArr.push(i);  // Same element (Generator and a Chip).
//     }

//     return returnArr;
// }

// function testFloor(inFloor) {
//     // console.log("TESTING:", inFloor);

//     let soloGen = false;
//     let soloChip = false;
//     for (let i = 0; i < inFloor.length; i++) {
//         if (inFloor[i][1] === 'G' && findMatchingCompIdx(inFloor[i], inFloor) === -1) { soloGen = true; }
//         else if (inFloor[i][1] === 'M' && findMatchingCompIdx(inFloor[i], inFloor) === -1) { soloChip = true; }
//     }
//     // console.log("TESTING: SOLOGEN:", soloGen, "SOLOCHIP:", soloChip);

//     if (soloGen && soloChip) {
//         // console.log("TESTING: BAD FLOOR.");
//         return false;
//     }
//     else {
//         // console.log("TESTING: GOOD FLOOR.");
//         return true;
//     }
// }

// function doSomething(floorNum, inFloors, numMoves, inDir, inComp) {
//     let currFloor = inFloors[floorNum];

//     // console.log(numMoves, "CURR: FLOORS:", inFloors);
//     // console.log(numMoves, "CURR: NOW:", floorNum, currFloor);

//     if (floorNum === 3 && inFloors[0].length === 0 && inFloors[1].length === 0 && inFloors[2].length === 0) {
//         console.log(numMoves, "END:", inFloors);
//         combos.push(numMoves);
//         // process.exit();
//         return;
//     }

//     for (let i = 0; i < currFloor.length; i++) {
//         const thisComponent = currFloor[i];

//         if (floorNum < 3 && !(inDir === 'D' && inComp === thisComponent)) {

//             // Try to move the matching chip with the generator.
//             let elevatorPartnerArr = getElevatorPartners(thisComponent, currFloor);
//             // if (thisComponent[1] === 'G') matchingChipIdxArr = findMatchingCompIdx(thisComponent, currFloor);
//             // console.log(numMoves, "MATCHIN:", matchingChipIdx, thisComponent, currFloor);

//             for (let k = 0; k < elevatorPartnerArr.length; k++) {
//                 let elevatorPartner = elevatorPartnerArr[k];

//                 if (testFloor([thisComponent, elevatorPartner])) {  // If the elevator partner is compatible.
//                     // Try moving the component up a floor.
//                     let floors = [...inFloors];
//                     // console.log(numMoves, "MOVING:", thisComponent, matchingChipIdx !== -1 ? currFloor[matchingChipIdx] : '', "TO:", inFloors[floorNum + 1]);

//                     let newFloor = [...inFloors[floorNum + 1], thisComponent];  // Make a copy of the state of floors.
//                     if (elevatorPartner !== -1) newFloor.push(currFloor[elevatorPartner]);
//                     // console.log("NEWFLOOR:", newFloor, "NUM:", floorNum, "COMP:", thisComponent);

//                     // If it's a valid move, then set the change and move to the new floor.
//                     if (testFloor(newFloor)) {
//                         // Remove the items from the current floor.
//                         floors[floorNum] = floors[floorNum].filter((elem, idx) => { return idx !== i && idx !== elevatorPartner; })
//                         // console.log(numMoves, "FILTERED:", floors[floorNum]);

//                         // Add them to the next floor.
//                         floors[floorNum + 1] = newFloor;

//                         doSomething(floorNum + 1, floors, numMoves + 1, 'U', thisComponent);  // Process the next floor with the current change.
//                     }
//                 }
//             }
//         }

//         // console.log(numMoves, "TEST:", inDir, 'U', inComp, thisComponent);
//         if (floorNum > 0 && !(inDir === 'U' && inComp === thisComponent)) {
//             // Moving Generators up only!
//             if (thisComponent[1] !== 'G') {
//                 // Try moving the component down a floor.
//                 let floors = [...inFloors];
//                 let newFloor = [...inFloors[floorNum - 1], thisComponent];  // Make a copy of the state of floors.

//                 // If it's a valid move, then set the change and move to the new floor.
//                 if (testFloor(newFloor)) {
//                     // Remove the items from the current floor.
//                     // floors[floorNum] = floors[floorNum].filter((elem, idx) => { return idx !== i; });
//                     floors[floorNum].splice(i, 1);

//                     // Add them to the next floor.
//                     floors[floorNum - 1] = newFloor;

//                     doSomething(floorNum - 1, floors, numMoves + 1, 'D', thisComponent);  // Process the next floor with the current change.
//                 }
//             }
//         }
//     }
// }