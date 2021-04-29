// __dirname = path to current directory
const currentDirectory = __dirname;
console.log("cd : "+currentDirectory);

// __filename = path to current file
console.log("file: "+ __filename);

// require = function to use module
const fs = require('fs');

// module = a file that conatin code of similar functionality and can be used throught out Node. js application 
console.log(module);

// process = info about program environment 
console.log(process);