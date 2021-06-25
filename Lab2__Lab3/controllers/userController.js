const User = require('../model/userModel')

const getSignInForm = (req,res) => {
    
}

const getSignUpForm = (req,res) => {
    res.sendFile("signup.html",{root:"./views/users"})
}


const signIn = (req, res) => {
    res.send("Sign In")
}
const signUp = (req,res) => {
    res.send("Sign Up")
}

module.exports = {signIn,signUp,getSignInForm,getSignUpForm}