const jwt = require('jsonwebtoken');
const { LocalStorage } = require('node-localstorage');
var localStorage = new LocalStorage('./scratch');

const checkSignIn = (req, res, next) => {
    try {
        const token = localStorage.getItem('token')
        const decode = jwt.verify(token, process.env.SECRET)
        console.log(decode.name);
        req.username = decode.name
        next()
    } catch (error) {
        res.redirect("/")
    }
   
}

module.exports = checkSignIn
