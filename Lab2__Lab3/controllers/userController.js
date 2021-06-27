const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
var ls = require('local-storage');
const { LocalStorage } = require('node-localstorage');
var localStorage = new LocalStorage('./scratch');

const getSignInForm = (req,res) => {
    res.sendFile("login-v2.html",{root:"./views/template/pages/examples"})
}

const getSignUpForm = (req, res) => {
    res.sendFile("register-v2.html",{root:"./views/template/pages/examples"})
}
const dashboardHandler = (req,res) => {
    // res.sendFile("dashboard.html",{root:"./views/users"})
    res.sendFile("index.html",{root:"./views/template"})
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
            { email: existingUser.email,name:existingUser.name,userId: existingUser._id }, process.env.SECRET, {
                expiresIn:'1h'
        })

        // saving the token to local storage
        localStorage.setItem('token',token) 
          
        return res.redirect('/dashboard') 

           
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Authentication failed"})
    }
}


const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    
    try {
        // checking for email
        const existingUser = await User.findOne({ email })
        if (existingUser)
            return res.status(404).json({ message: "User with same email already exist" })
        
        // checking for password
        if (password.length < 6)
            return res.status(404).json({ message: "Password must be at least 6 character" })
        if (password !== confirmPassword)
            return res.status(404).json({ message: "Password doesn't match" })
        
        // store into database 
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, password: hashedPassword })

        res.redirect('/signin')
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Sign up failed",error})
    }
    
}

const logout = (req,res) => {
    localStorage.clear();
    res.send("You are logged out")
}



module.exports = {signIn,signUp,getSignInForm,getSignUpForm,dashboardHandler,logout}