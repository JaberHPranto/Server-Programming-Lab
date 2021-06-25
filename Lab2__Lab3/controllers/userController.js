const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const getSignInForm = (req,res) => {
    
}

const getSignUpForm = (req,res) => {
    res.sendFile("signup.html",{root:"./views/users"})
}


const signIn = async (req, res) => {
    res.send("Sign In")
}
const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    
    // checking for email
    const existingUser = await User.findOne({ email })
    if (existingUser)
        return res.status(404).json({ message: "User not found" })
    
    // checking for password
    if (password.length < 6)
        return res.status(404).json({ message: "Password must be at least 6 character" })
    if (password !== confirmPassword)
        return res.status(404).json({ message: "Password doesn't match" })
    
    

    res.send("Sign Up")
}

module.exports = {signIn,signUp,getSignInForm,getSignUpForm}