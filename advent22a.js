const lines = require('fs').readFileSync('advent22.in', { encoding: 'utf-8' }).split("\n");

let total = 0;
for (const [i, line] of lines.entries()) {
    if (i < 2) continue;
    // if (line[33] !== 'T') console.log("USED NOT IN TERABYTES!", i, line);

    // const used = parseInt(line.substring(30, 33));
    // if (used > 0) {
    //     // for (let k = i + 1; k < lines.length; k++) {
    //     // const test_line = lines[k];
    //     for (const [k, test_line] of lines.entries()) {
    //         if (k === i) continue;
    //         if (line[40] !== 'T') console.log("AVAIL NOT IN TERABYTES!", k, test_line);

    //         const avail = parseInt(test_line.substring(37, 40));
    //         if (used <= avail) {
    //             total += 1;
    //             console.log("FITS:", used, avail, line, test_line);
    //         }
    //     }
    // }
    const tokens = line.trim().split(/\s+/);
    const used = parseInt(tokens[2].substring(0, tokens[2].length - 1));
    if (used > 0) {
        for (const [k, test_line] of lines.entries()) {
            if (k < 2 || k === i) continue;
            const inner_tokens = test_line.trim().split(/\s+/);

            const avail = parseInt(inner_tokens[3].substring(0, inner_tokens[3].length - 1));
            if (used <= avail) {
                total += 1;
                // console.log("FITS:", used, avail, line, test_line);
            }
        }
    }
}

console.log("TOTAL:", total);