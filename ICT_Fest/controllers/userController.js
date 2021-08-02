const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const alert = require('alert')
const { LocalStorage } = require('node-localstorage');
var localStorage = new LocalStorage('./scratch');

const getSignInForm = (req,res) => {
    res.sendFile("login-v2.html",{root:"./views/template/pages/examples"})
}

const getSignUpForm = (req, res) => {
    res.sendFile("register-v2.html",{root:"./views/template/pages/examples"})
}
const dashboardHandler = (req,res) => {
    res.render('dashboard',{name:req.username})
}

const signIn = async (req, res) => {

    const { email, password } = req.body
    try {
        // Checking whether this email exist or not
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            // return res.status(404).json({ message: "Email doesn't exist" })
            alert("Email doesn't exist")
            return res.redirect("/signin")
        }
        
        // checking for password
        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) {
            // return res.status(404).json({ message: "Invalid Credentials" })
            alert("Invalid Credentials")
            return res.redirect("/signin")
        }
        
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

        if (!name || !email || !password || !confirmPassword) {
            alert("No fields should remain empty")
            return res.redirect("/signup")           
        }

        // checking for email
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // return res.status(404).json({ message: "User with same email already exist" })
            alert("User with same email already exist")
            return res.redirect("/signup")
            
        }
        
        // checking for password
        if (password.length < 6) {
            // return res.status(404).json({ message: "Password must be at least 6 character" })
            alert("Password must be at least 6 character")
            return res.redirect("/signup")
        }
        if (password !== confirmPassword) {
            // return res.status(404).json({ message: "Password doesn't match" })
            alert("Password doesn't match")
            return res.redirect("/signup")
        }
        
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
    res.sendFile("logout.html",{root:"./views/template"})
}



module.exports = {signIn,signUp,getSignInForm,getSignUpForm,dashboardHandler,logout}