const { MinMaxHeap } = require("./MinMaxHeap");

const lines = require('fs').readFileSync('advent24.in', { encoding: 'utf8' }).split("\n");

let node_locs = [];
for (let i = 0; i < lines.length; i++) {
    for (let k = 0; k < lines[i].length; k++) {
        if (lines[i][k] !== '.' && lines[i][k] !== '#') {
            let val = parseInt(lines[i][k]);
            if (!isNaN(val)) node_locs.push([val, i, k]); // num, row, col
        }
    }
}
node_locs.sort((a, b) => a[0] - b[0]);
// console.log("node_locs w/ IDX:", node_locs);

node_locs = node_locs.map(num => [num[1], num[2]]);
// console.log("node_locs:", node_locs);


function heuristic(start, end) {
    return Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]);  // Manhattan distance.
}

function reconstruct_path_lines(curr, cameFrom) {
    const total_path = [];
    let next = cameFrom[curr[0]][curr[1]];
    while (next && next[0] !== -1) {
        total_path.push(next);
        next = cameFrom[next[0]][next[1]];
    }
    return total_path.reverse();
}

function get_neighbors_lines(curr) {
    const neighbors = [];
    if (lines[curr[0]][curr[1] + 1] !== "#") neighbors.push([curr[0], curr[1] + 1]);  // Right
    if (lines[curr[0] + 1][curr[1]] !== "#") neighbors.push([curr[0] + 1, curr[1]]);  // Down
    if (lines[curr[0] - 1][curr[1]] !== "#") neighbors.push([curr[0] - 1, curr[1]]);  // Up
    if (lines[curr[0]][curr[1] - 1] !== "#") neighbors.push([curr[0], curr[1] - 1]);  // Left
    return neighbors;
}

function a_star(start, goal) {
    // console.log("a-star start:", start, "goal:", goal);
    // Initialize all the data structures used.
    let cameFrom = [];
    let gScore = [];
    let fScore = [];
    let inOpenSet = [];
    for (let i = 0; i < lines.length; i++) {
        cameFrom.push(new Array(lines[i].length));
        gScore.push(new Array(lines[i].length));
        fScore.push(new Array(lines[i].length));
        inOpenSet.push(new Array(lines[i].length));

        for (let k = 0; k < lines[i].length; k++) {
            cameFrom[i][k] = [-1, -1];
            gScore[i][k] = Infinity;
            fScore[i][k] = Infinity;
            inOpenSet[i][k] = false;
        }
    }

    // Start algo, using Wiki pseudocode.
    // https://en.wikipedia.org/wiki/A*_search_algorithm
    const openSet = [];

    gScore[start[0]][start[1]] = 0;

    let h_val = heuristic(start, goal);
    fScore[start[0]][start[1]] = h_val;

    MinMaxHeap.push(openSet, [h_val, start]);
    inOpenSet[start[0]][start[1]] = true;

    while (openSet.length > 0) {
        let curr = MinMaxHeap.pop(openSet);
        curr = curr[1];  // Remove the fScore.

        // console.log("CURR:", curr);
        inOpenSet[curr[0]][curr[1]] = false;

        if (curr[0] === goal[0] && curr[1] === goal[1]) return reconstruct_path_lines(curr, cameFrom);

        const neighbors = get_neighbors_lines(curr);
        // console.log("NEIGHBORS:", neighbors);
        neighbors.forEach(neighbor => {
            const tentative_gScore = gScore[curr[0]][curr[1]] + 1;
            // console.log("GSCORES:", tentative_gScore, gScore[neighbor[0]][neighbor[1]]);
            if (tentative_gScore < gScore[neighbor[0]][neighbor[1]]) {
                cameFrom[neighbor[0]][neighbor[1]] = curr;

                gScore[neighbor[0]][neighbor[1]] = tentative_gScore;

                const newScore = tentative_gScore + heuristic(neighbor, goal);
                fScore[neighbor[0]][neighbor[1]] = newScore;

                if (!inOpenSet[neighbor[0]][neighbor[1]]) {
                    MinMaxHeap.push(openSet, [newScore, neighbor]);
                    inOpenSet[neighbor[0]][neighbor[1]] = true;
                }
            }
        })
    }

    return false;
}

let distances = new Array(node_locs.length).fill().map(_ => new Array(node_locs.length).fill(0));
for (i = 0; i < node_locs.length - 1; i++) {
    for (k = i + 1; k < node_locs.length; k++) {
        let a_star_res = a_star(node_locs[i], node_locs[k]);
        // console.log("A_STAR_RES:", i, k, a_star_res.length);
        if (a_star_res) {
            distances[i][k] = a_star_res.length;
            distances[k][i] = a_star_res.length;
        }
    }
}
// console.log("DISTANCES:", distances);

function get_neighbors_nodes(curr, visited) {
    const neighbors = [];
    for (let i = 0; i < node_locs.length; i++) {
        if (i === curr) continue;

        if (visited.indexOf(i) === -1) {
            neighbors.push(i);
        }
    }
    return neighbors;
}

function bfs(start_idx) {
    let shortest = [Infinity, []];
    const openSet = [];

    openSet.push([0, start_idx, [0]]);

    while (openSet.length > 0) {
        const [curr_dist, curr, visited] = openSet.shift();

        const neighbors = get_neighbors_nodes(curr, visited);
        // console.log("NEIGHBORS:", curr, neighbors, "VISITED:", visited);

        if (neighbors.length === 0) {
            // if (curr_dist < shortest[0]) {
            //     shortest[0] = curr_dist;
            //     shortest[1] = visited;
            // }
            let return_dist = curr_dist + distances[curr][0];  // Back to start!
            if (return_dist < shortest[0]) {
                shortest[0] = curr_dist;
                shortest[1] = visited;
            }
        }

        neighbors.forEach(neighbor => {
            const distance = distances[curr][neighbor];
            const total_distance = curr_dist + distance;

            let new_visited = [...visited, neighbor];
            // console.log("ADDING:", neighbor, new_visited);
            openSet.push([total_distance, neighbor, new_visited]);
        });
    }

    return shortest;
}

const short = bfs(0);
// console.log("SHORTEST:", shortest);
console.log("SHORTEST:", short[0]);