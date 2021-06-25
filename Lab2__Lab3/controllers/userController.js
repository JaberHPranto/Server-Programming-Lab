const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const getSignInForm = (req,res) => {
    res.sendFile('signin.html',{root:'./views/users'})
}

const getSignUpForm = (req,res) => {
    res.sendFile("signup.html",{root:"./views/users"})
}
const dashboardHandler = (req,res) => {
    res.send("Welcome to dashboard")
}

const signIn = async (req, res) => {

    const { email, password } = req.body
    try {
        // Checking whether is email exist or not
        const existingUser = await User.findOne({ email })
        if (!existingUser)
            return res.status(404).json({ message: "Email doesn't exist" })
        
        console.log(existingUser);
        // checking for password
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword)
            return res.status(404).json({ message: "Invalid Credentials" })
        
        // generating jwt 
        const token = jwt.sign(
            { email: existingUser.email, userId: existingUser._id }, process.env.SECRET, {
                expiresIn:'1h'
        })
        
        res.cookie('token', token)
        return res.redirect('/') 

           
    } catch (error) {
        res.status(401).json({message:"Authentication failed",error})
    }
}


const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    
    try {
        // checking for email
        const existingUser = await User.findOne({ email })
        if (existingUser)
            return res.status(404).json({ message: "User not found" })
        
        // checking for password
        if (password.length < 6)
            return res.status(404).json({ message: "Password must be at least 6 character" })
        if (password !== confirmPassword)
            return res.status(404).json({ message: "Password doesn't match" })
        
        // store into database 
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, password: hashedPassword })

        res.send("Sign Up")
    } catch (error) {
        res.status(500).json({message:"Sign up failed",error})
    }
    
}

module.exports = {signIn,signUp,getSignInForm,getSignUpForm,dashboardHandler}