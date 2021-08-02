const jwt = require('jsonwebtoken');
const { LocalStorage } = require('node-localstorage');
var localStorage = new LocalStorage('./scratch');

const checkSignIn = (req, res, next) => {
    try {
        const token = localStorage.getItem('token')
        const decode = jwt.verify(token, process.env.SECRET)
        req.username = decode.name
        next()
    } catch (error) {
        res.redirect("/")
    }
   
}

const addUserData = (req, res, next) => {  
// locals An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any)
    res.locals.req = req;
    res.locals.res = res;
    next()
}

module.exports = {checkSignIn,addUserData}
