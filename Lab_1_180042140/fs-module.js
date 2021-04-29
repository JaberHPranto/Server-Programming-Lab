/*
Main funrtionality -->
 -> Read
 -> Write
 -> Append
 -> Delete
 -> Rename
*/

const fs = require('fs');

// fs.writeFileSync('./content/test.txt',"I'm learning Node.js\n")
// fs.appendFileSync("./content/test.txt", "I'm learning JavaScript");

// fs.rename('./content/test.txt', './content/demoFile.txt', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successful !!!");
//     }
// })

fs.readFile('./content/demoFile.txt', "utf-8", (err,data) => {
     if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
})

//delete

fs.unlink('./content/test.txt', (err) => {
    if (err) console.log(err)
    else console.log("Deleted");
})