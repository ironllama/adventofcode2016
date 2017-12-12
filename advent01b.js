var dir = "N";
var currX = 0;
var currY = 0;
var thisX = true;

//var arrDir = ['R2','L3'];

//var arrDir = ['R2','R2', 'R2'];

//var arrDir = ['R5','L5', 'R5', 'R3'];

var arrDir = ['R3', 'L5', 'R2', 'L1', 'L2', 'R5', 'L2', 'R2', 'L2', 'L2', 'L1', 'R2', 'L2', 'R4', 'R4', 'R1', 'L2', 'L3', 'R3', 'L1', 'R2', 'L2', 'L4', 'R4', 'R5', 'L3', 'R3', 'L3', 'L3', 'R4', 'R5', 'L3', 'R3', 'L5', 'L1', 'L2', 'R2', 'L1', 'R3', 'R1', 'L1', 'R187', 'L1', 'R2', 'R47', 'L5', 'L1', 'L2', 'R4', 'R3', 'L3', 'R3', 'R4', 'R1', 'R3', 'L1', 'L4', 'L1', 'R2', 'L1', 'R4', 'R5', 'L1', 'R77', 'L5', 'L4', 'R3', 'L2', 'R4', 'R5', 'R5', 'L2', 'L2', 'R2', 'R5', 'L2', 'R194', 'R5', 'L2', 'R4', 'L5', 'L4', 'L2', 'R5', 'L3', 'L2', 'L5', 'R5', 'R2', 'L3', 'R3', 'R1', 'L4', 'R2', 'L1', 'R5', 'L1', 'R5', 'L1', 'L1', 'R3', 'L1', 'R5', 'R2', 'R5', 'R5', 'L4', 'L5', 'L5', 'L5', 'R3', 'L2', 'L5', 'L4', 'R3', 'R1', 'R1', 'R4', 'L2', 'L4', 'R5', 'R5', 'R4', 'L2', 'L2', 'R5', 'R5', 'L5', 'L2', 'R4', 'R4', 'L4', 'R1', 'L3', 'R1', 'L1', 'L1', 'L1', 'L4', 'R5', 'R4', 'L4', 'L4', 'R5', 'R3', 'L2', 'L2', 'R3', 'R1', 'R4', 'L3', 'R1', 'L4', 'R3', 'L3', 'L2', 'R2', 'R2', 'R2', 'L1', 'L4', 'R3', 'R2', 'R2', 'L3', 'R2', 'L3', 'L2', 'R4', 'L2', 'R3', 'L4', 'R5', 'R4', 'R1', 'R5', 'R3'];

var arrVisited = [];
var firstRetrace = "";


for (var i = 0; i < arrDir.length; i++) {

    if (arrDir[i].charAt(0) === 'R') {
        if (dir === 'N') dir = 'E';
        else if (dir === 'E') dir = 'S';
        else if (dir === 'S') dir = 'W';
        else if (dir === 'W') dir = 'N';
    }
    else if (arrDir[i].charAt(0) === 'L') {
        if (dir === 'N') dir = 'W';
        else if (dir === 'W') dir = 'S';
        else if (dir === 'S') dir = 'E';
        else if (dir === 'E') dir = 'N';
    }
    
    var posNeg = 1;
    if (dir === 'S' || dir === 'W') posNeg = -1;
    
    var move = posNeg * arrDir[i].substr(1);
    if (thisX)
    {
        for (var j = 0; j < Math.abs(move); j++)
        {
            if (move > 0) currX++;
            else currX--;
            checkRetrace(currX, currY);
        }
        //currX += move;
    }
    else
    {
        //currY += move;
        for (var j = 0; j < Math.abs(move); j++)
        {
            if (move > 0) currY++;
            else currY--;
            checkRetrace(currX, currY);
        }
    }
    
    thisX = !thisX;
    
    console.log (arrDir[i] + ": x(" + currX + ") y(" + currY + ")");
}

console.log ("End Pos: x(" + currX + ") y(" + currY + ") Distance: " + (Math.abs(currX) + Math.abs(currY)));


function checkRetrace (inX, inY) {
    if (arrVisited.indexOf(inX + "," + inY) >= 0)
    {
        console.log ("RETRACE : x(" + inX + ") y(" + inY + ")");
        if(firstRetrace === "") firstRetrace = "RETRACE : x(" + inX + ") y(" + inY + ") Distance: " + (Math.abs(currX) + Math.abs(currY));
    }
    else arrVisited.push(inX + "," + inY);
}

console.log ("First retrace: " + firstRetrace);
