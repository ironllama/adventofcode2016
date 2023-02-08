// const lines = require('fs').readFileSync('advent22.ex', { encoding: 'utf8' }).split("\n");
const lines = require('fs').readFileSync('advent22.in', { encoding: 'utf8' }).split("\n");

let goal_moved = false;
// const overall_visited = [];

Array.prototype.add = function (newState) {
    let containsState = false;
    for (const v of this) {
        // if (v[0] === newState[0]
        //     && v[1] === newState[1] && v[2] === newState[2]
        if (v[1] === newState[1] && v[2] === newState[2]
            && v[3] === newState[3] && v[4] === newState[4]) {
            // console.log("EXISTS:", newState);
            containsState = true;
            break;
        }
    }

    if (!containsState) {
        // console.log("ADDING:", newState);
        // if (!goal_moved && (newState[3] !== 0 || newState[4] !== grid[0].length - 1)) {  // If goal has moved...
        //     goal_moved = true;
        //     this.length = 0;
        //     // console.log("MOVED!", newState, "STEP:", newState[0] + 1);
        //     // process.exit();
        // }

        // if (goal_moved) {
        //     if (newState[3] === 0 && newState[4] === grid[0].length - 1) return;
        // }
        // else {
        //     let containsVisited = false;
        //     for (let v of overall_visited) {
        //         if (v[0] === newState[1] && v[1] === newState[2]) {
        //             containsVisited = true;
        //             // console.log("OVERALL VISITED!");
        //             return;
        //         }
        //     }
        //     overall_visited.push([newState[1], newState[2]]);

        //     // if (!containsVisited) {
        //     //     // let already_visited = false;
        //     //     // // console.log("HERE:", newState[5]);
        //     //     // for (const [from_y, from_x] of newState[5]) {
        //     //     //     if (from_y === newState[1] && from_x === newState[2]) {
        //     //     //         already_visited = true;
        //     //     //         // console.log("ALREADY VISITED!");
        //     //     //         return;
        //     //     //     }
        //     //     // }
        //     //     // if (already_visited) return;
        //     // }
        // }  // Doesn't seem to make a difference!

        this.push(newState);
    }
}

let zero_node_size = parseInt(lines.find(line => line.indexOf(" 0T") !== -1).trim().split(/\s+/)[1]);
let grid = [];
let start = null;

let id = 0;
for (let i = 2; i < lines.length; i++) {
    const tokens = lines[i].trim().split(/\s+/);
    const location = tokens[0].split("/")[3].split("-");

    const x = parseInt(location[1].substring(1));
    const y = parseInt(location[2].substring(1));
    const size = parseInt(tokens[1].substring(0, tokens[1].length - 1));
    const used = parseInt(tokens[2].substring(0, tokens[2].length - 1));
    // console.log("X:", x, "Y:", y, "size:", size, "used:", used);

    if (y >= grid.length) grid.push([]);

    if (used === 0) {
        start = [y, x];
        grid[y].push("_");
    }
    else if (used > zero_node_size) grid[y].push("#");
    else grid[y].push('.');

    id += 1;
}
grid[0][grid[0].length - 1] = 'G';
// console.log("grid:", grid, "start:", start);


const openSet = [];
openSet.add([0, start[0], start[1], 0, grid[0].length - 1, -1, -1]);  // step, y, x, location of G(y, x), visited
let tempState = find_the_g();
// console.log("TOTAL:", tempState);

openSet.length = 0;  // Reset the queue.
openSet.add(tempState);  // step, y, x, location of G(y, x), visited
tempState = bring_the_g();
console.log("TOTAL:", tempState[0]);

function find_the_g() {
    function get_neighbors(curr_y, curr_x, from_y, from_x) {
        const neighbors = [];
        if (curr_x < grid[0].length - 1 && !(curr_y === from_y && (curr_x + 1) === from_x)) neighbors.push([curr_y, curr_x + 1]); // Right
        if (curr_y > 0 && !((curr_y - 1) === from_y && curr_x === from_x)) neighbors.push([curr_y - 1, curr_x]); // Up
        if (curr_x > 0 && !(curr_y === from_y && (curr_x - 1) === from_x)) neighbors.push([curr_y, curr_x - 1]); // Left
        if (curr_y < grid.length - 1 && !((curr_y + 1) === from_y && curr_x === from_x)) neighbors.push([curr_y + 1, curr_x]); // Down
        return neighbors;
    }

    function addNeighbor(old_state, neighbor_y, neighbor_x) {
        // if (goal_moved) console.log("ADD NEIGHBOR:", old_state, neighbor_y, neighbor_x);
        if (grid[neighbor_y][neighbor_x] !== '#') {  // Valid movement.
            let new_g_y = old_state[3];
            let new_g_x = old_state[4];

            let newState = [old_state[0] + 1, neighbor_y, neighbor_x, new_g_y, new_g_x, old_state[1], old_state[2]];

            if (neighbor_y === new_g_y && neighbor_x === new_g_x  // If neighbor is the G...
                && ((old_state[1] + old_state[2]) < (neighbor_y + neighbor_x))) {  // Also, if the new G location is closer to 0,0 than old G.
                newState[3] = old_state[1];
                newState[4] = old_state[2];

                return newState;
            }

            openSet.add(newState);

            return false;
        }
    }

    while (openSet.length > 0) {
        const state = openSet.shift();
        // console.log("LOOP:", state.join(", "));
        const [curr_step, curr_y, curr_x, g_y, g_x, from_y, from_x] = state;

        for (const [neighbor_y, neighbor_x] of get_neighbors(curr_y, curr_x, from_y, from_x)) {
            let newState = addNeighbor(state, neighbor_y, neighbor_x);
            if (newState) return newState;
        }
    }
}


function bring_the_g() {
    let get_neighbors = function (curr_y, curr_x, from_y, from_x) {
        const neighbors = [];
        if (curr_x > 0 && !(curr_y === from_y && (curr_x - 1) === from_x)) neighbors.push([curr_y, curr_x - 1]); // Left
        if (curr_y > 0 && !((curr_y - 1) === from_y && curr_x === from_x)) neighbors.push([curr_y - 1, curr_x]); // Up
        if (curr_x < grid[0].length - 1 && !(curr_y === from_y && (curr_x + 1) === from_x)) neighbors.push([curr_y, curr_x + 1]); // Right
        if (curr_y < grid.length - 1 && !((curr_y + 1) === from_y && curr_x === from_x)) neighbors.push([curr_y + 1, curr_x]); // Down
        return neighbors;
    }

    function addNeighbor(old_state, neighbor_y, neighbor_x) {
        // if (goal_moved) console.log("ADD NEIGHBOR:", old_state, neighbor_y, neighbor_x);
        if (grid[neighbor_y][neighbor_x] !== '#') {  // Valid movement.
            let new_g_y = old_state[3];
            let new_g_x = old_state[4];

            let newState = [old_state[0] + 1, neighbor_y, neighbor_x, new_g_y, new_g_x, old_state[1], old_state[2]];

            if (neighbor_y === new_g_y && neighbor_x === new_g_x) { // If neighbor is the G...
                if ((old_state[1] + old_state[2]) < (neighbor_y + neighbor_x)) {  // Also, if the new G location is closer to 0,0 than old G.
                    newState[3] = old_state[1];  // Move the G to new spot.
                    newState[4] = old_state[2];

                    openSet.length = 0;  // Moved the G, start over to next optimal move of G.

                    if (newState[3] === 0 && newState[4] === 0) return newState; // End state

                    // openSet.length = 0;  // Reset searches for next movement!
                }
                else return false;  // If they move the G and it's not optimal, just ignore this branch.
            }

            openSet.add(newState);
            return false;
        }
    }

    while (openSet.length > 0) {
        const state = openSet.shift();
        // console.log("LOOP:", state.join(", "));
        const [curr_step, curr_y, curr_x, g_y, g_x, from_y, from_x] = state;

        for (const [neighbor_y, neighbor_x] of get_neighbors(curr_y, curr_x, from_y, from_x)) {
            let newState = addNeighbor(state, neighbor_y, neighbor_x);
            if (newState) return newState;
        }
    }
}


// CODE GRAVEYARD.

// // const { MinMaxHeap } = require('./MinMaxHeap');
//
// // const lines = require('fs').readFileSync('advent22.ex', { encoding: 'utf8' }).split("\n");
// // const gridSize = 3;
// const lines = require('fs').readFileSync('advent22.in', { encoding: 'utf8' }).split("\n");
// // const gridSize = 27;
//
// let zero_node_size = parseInt(lines.find(line => line.indexOf(" 0T") !== -1).trim().split(/\s+/)[1]);
// // let grid = new Array(gridSize).fill().map(_ => new Array(gridSize).fill('?'));
// let grid = [];
// let start = null;
// const overall_visited = [];
//
// let id = 0;
// for (let i = 2; i < lines.length; i++) {
    // const tokens = lines[i].trim().split(/\s+/);
    // const location = tokens[0].split("/")[3].split("-");
//
    // const x = parseInt(location[1].substring(1));
    // const y = parseInt(location[2].substring(1));
    // const size = parseInt(tokens[1].substring(0, tokens[1].length - 1));
    // const used = parseInt(tokens[2].substring(0, tokens[2].length - 1));
    // // console.log("X:", x, "Y:", y, "size:", size, "used:", used);
//
    // if (y >= grid.length) grid.push([]);
//
    // // grid[y][x] = [id, size, used];
    // if (used === 0) {
        // start = [y, x];
        // // grid[y][x] = "_";
        // grid[y].push("_");
    // }
    // // else if (y === 0 && x === grid[0].length - 1) grid[y][x] = "G";
    // else if (used > zero_node_size) grid[y].push("#");
    // else grid[y].push('.');
//
    // id += 1;
// }
// grid[0][grid[0].length - 1] = 'G';
// // console.log("grid:", grid, "start:", start);
//
// // Deep copy an Array.
// Array.prototype.clone = function () { return this.map(item => Array.isArray(item) ? item.clone() : item) }
//
// let z = 0;
// let goal_moved = false;
// Array.prototype.add = function (newState) {
    // let containsState = false;
    // for (let [k, v] of this) {
        // // v = v[1];  // Using MinMaxHeap, the state is the second param, after priority.
        // // if (v[0] === newState[0]
        // //     && v[1] === newState[1] && v[2] === newState[2]
        // if (v[1] === newState[1] && v[2] === newState[2]
            // && v[3] === newState[3] && v[4] === newState[4]) {
            // // console.log("EXISTS:", newState);
            // if (v[0] > newState[0])
                // this.splice(k, 1);
            // else
                // containsState = true;
//
            // break;
        // }
    // }
//
    // if (!containsState) {
        // // let priority = newState[1] + Math.abs((grid[0].length - 1) - newState[2]);
        // // let already_visited = false;
        // // for (const [from_y, from_x] of newState[5]) {
        // //     if (from_y === newState[1] && from_x === newState[2]) {
        // //         already_visited = true;
        // //         break;
        // //     }
        // // }
        // // if (already_visited) return;
//
        // // if (newState[3] === 0 && newState[4] === grid[0].length - 1) {  // If goal hasn't moved, yet.
        // //     priority = newState[1] + Math.abs((grid[0].length - 1) - newState[2]);
        // // }
        // // let priority = z++;
        // if (!goal_moved && (newState[3] !== 0 || newState[4] !== grid[0].length - 1)) {  // If goal has moved...
            // goal_moved = true;
            // this.length = 0;
            // console.log("MOVED!", newState, "STEP:", newState[0] + 1);
            // // process.exit();
            // // priority = (1000 + newState[0]) + (newState[1] + newState[2]);
        // }
//
        // let priority = 0;
        // if (goal_moved) {
            // if (newState[3] === 0 && newState[4] === grid[0].length - 1) return;
            // // priority = (1000 + newState[0]) + (newState[1] + newState[2]);
            // // priority = newState[1] + newState[2];
            // // priority = (100 * newState[0]) + newState[3] + newState[4];
            // // priority = (100 * (newState[3] + newState[4])) + newState[1] + newState[2];
            // // priority = newState[3] + newState[4];
            // priority = z++;
        // }
        // else {
            // let containsVisited = false;
            // for (let v of overall_visited) {
                // if (v[0] === newState[1] && v[1] === newState[2]) {
                    // containsVisited = true;
                    // // console.log("OVERALL VISITED!");
                    // return;
                // }
            // }
            // overall_visited.push([newState[1], newState[2]]);
//
            // if (!containsVisited) {
                // // let already_visited = false;
                // // // console.log("HERE:", newState[5]);
                // // for (const [from_y, from_x] of newState[5]) {
                // //     if (from_y === newState[1] && from_x === newState[2]) {
                // //         already_visited = true;
                // //         // console.log("ALREADY VISITED!");
                // //         return;
                // //     }
                // // }
                // // if (already_visited) return;
                // // priority = (100 * newState[0]) + (newState[1] + Math.abs((grid[0].length - 1) - newState[2]));
                // // priority = newState[1] + Math.abs((grid[0].length - 1) - newState[2]);
                // priority = z++;
            // }
        // }
//
        // // // console.log("ADDING:", newState);
        // // MinMaxHeap.push(this, [priority, newState]);
//
        // this.push(newState);
    // }
// }
// const openSet = [];
// openSet.add([0, start[0], start[1], 0, grid[0].length - 1, [[-1, -1]]]);  // step, y, x, location of G(y, x), visited
//
// while (openSet.length > 0) {
    // const state = openSet.shift();
    // // const [priority, state] = MinMaxHeap.pop(openSet);
    // console.log("LOOP:", state[0], state[1], state[2], state[3], state[4]);
    // const [curr_step, curr_y, curr_x, g_y, g_x, visited] = state;
    // const [from_y, from_x] = visited[visited.length - 1];
//
    // // overall_visited.push([curr_y, curr_x]);
    // // console.log("OVERALL:", overall_visited);
//
    // // Get neighbors.
    // if (curr_step < 300) {
        // if (goal_moved) {
            // if (curr_x > 0 && !(curr_y === from_y && (curr_x - 1) === from_x)) addNeighbor(state, curr_y, curr_x - 1); // Left
            // if (curr_y > 0 && !((curr_y - 1) === from_y && curr_x === from_x)) addNeighbor(state, curr_y - 1, curr_x); // Up
            // if (curr_x < grid[0].length - 1 && !(curr_y === from_y && (curr_x + 1) === from_x)) addNeighbor(state, curr_y, curr_x + 1); // Right
            // if (curr_y < grid.length - 1 && !((curr_y + 1) === from_y && curr_x === from_x)) addNeighbor(state, curr_y + 1, curr_x); // Down
        // }
        // else {
            // if (curr_x < grid[0].length - 1 && !(curr_y === from_y && (curr_x + 1) === from_x)) addNeighbor(state, curr_y, curr_x + 1); // Right
            // if (curr_y > 0 && !((curr_y - 1) === from_y && curr_x === from_x)) addNeighbor(state, curr_y - 1, curr_x); // Up
            // if (curr_x > 0 && !(curr_y === from_y && (curr_x - 1) === from_x)) addNeighbor(state, curr_y, curr_x - 1); // Left
            // if (curr_y < grid.length - 1 && !((curr_y + 1) === from_y && curr_x === from_x)) addNeighbor(state, curr_y + 1, curr_x); // Down
        // }
    // }
// }
//
// function addNeighbor(old_state, neighbor_y, neighbor_x) {
    // // console.log("ADD NEIGHBOR:", old_state, neighbor_y, neighbor_x);
    // if (grid[neighbor_y][neighbor_x] !== '#') {  // Valid movement.
        // let new_g_y = old_state[3];
        // let new_g_x = old_state[4];
        // if (neighbor_y === new_g_y && neighbor_x === new_g_x) {  // If moving into the G, switch the G location.
            // new_g_y = old_state[1];
            // new_g_x = old_state[2];
        // }
//
        // // Each state checks to see if they've already visited this space. Might only be relevant for first half?
        // let already_visited = false;
        // // console.log("HERE:", old_state[5]);
        // for (const [from_y, from_x] of old_state[5]) {
            // if (from_y === neighbor_y[1] && from_x === neighbor_x[2]) {
                // already_visited = true;
                // // console.log("ALREADY VISITED!");
                // return;
            // }
        // }
        // if (already_visited) return;
//
        // const new_visited = old_state[5].clone();
        // new_visited.push([old_state[1], old_state[2]]);
//
        // if (new_g_y === 0 && new_g_x === 0) {  // End state
            // // console.log("VISITED:", new_visted);
            // console.log("STEPS:", old_state[0] + 1);
            // process.exit();
        // }
//
        // openSet.add([old_state[0] + 1, neighbor_y, neighbor_x, new_g_y, new_g_x, new_visited]);
    // }
// }
//