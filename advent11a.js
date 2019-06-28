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

let combos = [];

let startingFloors = [['HM', 'LM'], ['HG'], ['LG'], []];
// let startingFloors = [['SG', 'SM', 'PG', 'PM'], ['TG', 'RG', 'RM', 'CG', 'CM'], ['TM'], []];
doSomething(0, startingFloors, 0);

console.log("END:", combos);


function findMatchingCompIdx(inComp, inFloor) {
    // console.log("FIND: COMP:", inComp, "FLOOR:", inFloor);
    for (let i = 0; i < inFloor.length; i++) {
        if (inFloor[i][0] === inComp[0]) {
            // console.log("FIND: COMP1:", inComp[1], "FLOOR1:", inFloor[i][1]);
            if (inComp[1] === 'G' && inFloor[i][1] === 'M') return i;
            else if (inComp[1] === 'M' && inFloor[i][1] === 'G') return i;
        }
    }
    return -1;
}

function getElevatorPartners(inComp, inFloor) {
    let returnArr = [-1];  // By self.

    for (let i = 0; i < inFloor.length; i++) {
        if (inFloor[i][0] === inComp[0]) returnArr.push(i);  // Same type (Generators or Chips).
        else if (inFloor[i][1] === inComp[1]) returnArr.push(i);  // Same element (Generator and a Chip).
    }

    return returnArr;
}

function testFloor(inFloor) {
    // console.log("TESTING:", inFloor);

    let soloGen = false;
    let soloChip = false;
    for (let i = 0; i < inFloor.length; i++) {
        if (inFloor[i][1] === 'G' && findMatchingCompIdx(inFloor[i], inFloor) === -1) { soloGen = true; }
        else if (inFloor[i][1] === 'M' && findMatchingCompIdx(inFloor[i], inFloor) === -1) { soloChip = true; }
    }
    // console.log("TESTING: SOLOGEN:", soloGen, "SOLOCHIP:", soloChip);

    if (soloGen && soloChip) {
        // console.log("TESTING: BAD FLOOR.");
        return false;
    }
    else {
        // console.log("TESTING: GOOD FLOOR.");
        return true;
    }
}

function doSomething(floorNum, inFloors, numMoves, inDir, inComp) {
    let currFloor = inFloors[floorNum];

    // console.log(numMoves, "CURR: FLOORS:", inFloors);
    // console.log(numMoves, "CURR: NOW:", floorNum, currFloor);

    if (floorNum === 3 && inFloors[0].length === 0 && inFloors[1].length === 0 && inFloors[2].length === 0) {
        console.log(numMoves, "END:", inFloors);
        combos.push(numMoves);
        // process.exit();
        return;
    }

    for (let i = 0; i < currFloor.length; i++) {
        const thisComponent = currFloor[i];

        if (floorNum < 3 && !(inDir === 'D' && inComp === thisComponent)) {

            // Try to move the matching chip with the generator.
            let elevatorPartnerArr = getElevatorPartners(thisComponent, currFloor);
            // if (thisComponent[1] === 'G') matchingChipIdxArr = findMatchingCompIdx(thisComponent, currFloor);
            // console.log(numMoves, "MATCHIN:", matchingChipIdx, thisComponent, currFloor);

            for (let k = 0; k < elevatorPartnerArr.length; k++) {
                let elevatorPartner = elevatorPartnerArr[k];

                if (testFloor([thisComponent, elevatorPartner])) {  // If the elevator partner is compatible.
                    // Try moving the component up a floor.
                    let floors = [...inFloors];
                    // console.log(numMoves, "MOVING:", thisComponent, matchingChipIdx !== -1 ? currFloor[matchingChipIdx] : '', "TO:", inFloors[floorNum + 1]);

                    let newFloor = [...inFloors[floorNum + 1], thisComponent];  // Make a copy of the state of floors.
                    if (elevatorPartner !== -1) newFloor.push(currFloor[elevatorPartner]);
                    // console.log("NEWFLOOR:", newFloor, "NUM:", floorNum, "COMP:", thisComponent);

                    // If it's a valid move, then set the change and move to the new floor.
                    if (testFloor(newFloor)) {
                        // Remove the items from the current floor.
                        floors[floorNum] = floors[floorNum].filter((elem, idx) => { return idx !== i && idx !== elevatorPartner; })
                        // console.log(numMoves, "FILTERED:", floors[floorNum]);

                        // Add them to the next floor.
                        floors[floorNum + 1] = newFloor;

                        doSomething(floorNum + 1, floors, numMoves + 1, 'U', thisComponent);  // Process the next floor with the current change.
                    }
                }
            }
        }

        // console.log(numMoves, "TEST:", inDir, 'U', inComp, thisComponent);
        if (floorNum > 0 && !(inDir === 'U' && inComp === thisComponent)) {
            // Moving Generators up only!
            if (thisComponent[1] !== 'G') {
                // Try moving the component down a floor.
                let floors = [...inFloors];
                let newFloor = [...inFloors[floorNum - 1], thisComponent];  // Make a copy of the state of floors.

                // If it's a valid move, then set the change and move to the new floor.
                if (testFloor(newFloor)) {
                    // Remove the items from the current floor.
                    // floors[floorNum] = floors[floorNum].filter((elem, idx) => { return idx !== i; });
                    floors[floorNum].splice(i, 1);

                    // Add them to the next floor.
                    floors[floorNum - 1] = newFloor;

                    doSomething(floorNum - 1, floors, numMoves + 1, 'D', thisComponent);  // Process the next floor with the current change.
                }
            }
        }
    }
}