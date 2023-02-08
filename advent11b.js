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

Array.prototype.addHeap = function (priority, state) {
    // let priority = state[2].reduce((acc, val) => acc += parseInt(val), 0);
    priority += 10 * (start_floors.length - state[2].length);
    priority += 100 * (max_iter - state[0]);
    // console.log("PRIORITY:", priority, "STATE:", state);
    MinMaxHeap.push(all_states, [priority, state]);
}

Array.prototype.popHeap = function () {
    return MinMaxHeap.pop(all_states);
}

// Sample.
// const start_floors = "1020";

// Puzzle input.
// let start_floors = "0000121111";
let start_floors = "00001211110000";

const max_iter = 2 * (start_floors.split("").reduce((a, v) => a += 3 - parseInt(v), 0));
const max_floor = 3;
// let final_floors = Array(start_floors.length).fill(max_floor).join("");
// let final_floors = Array(start_floors.length).fill(max_floor);

const all_states = [];
all_states.addHeap(0, [0, 0, start_floors]);

const visited = [];


while (all_states.length > 0) {
    const curr_state = all_states.popHeap()[1];
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

        const new_state = [curr_step + 1, curr_floor + 1, new_floors.join("")];
        if (is_possible(new_floors) && !has_all_floors(new_state)) {
            // console.log("PLUS: ", new_state);
            let priority = new_floors.reduce((a, v) => a + v, 0);
            all_states.addHeap(priority, new_state);
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
            let priority = new_floors.reduce((a, v) => a + v, 0);
            all_states.addHeap(priority, new_state);
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
                valid = false;
            }
        }
    }

    // console.log("is_possible:", new_floors, valid);
    return valid;
}
