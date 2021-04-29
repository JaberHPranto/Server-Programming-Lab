const HelloFunc = require("./helloWorld");

// HelloFunc.Hello()
// console.log(HelloFunc.name)

// setInterval

setInterval(() => {
    HelloFunc.Hello()
}, 1000);

// setTimeout

setTimeout(() => {
    console.log(HelloFunc.name); 
}, 4000);