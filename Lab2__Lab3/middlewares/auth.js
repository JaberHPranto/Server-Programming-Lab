const { LocalStorage } = require('node-localstorage');
var localStorage = new LocalStorage('./scratch');
const checkSignIn = (req, res, next) => {
    // console.log("Checking");
    // console.log(localStorage.getItem('token'))
    next()
}

module.exports = checkSignIn
