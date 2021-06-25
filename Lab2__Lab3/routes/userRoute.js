const express = require('express');
const { signIn, signUp,getSignInForm,getSignUpForm,dashboardHandler } = require('../controllers/userController')

const router = express.Router()

router.get("/",(req,res) => {
    res.send("This is a user route")
})

router.get("/signin", getSignInForm)
router.get("/signup", getSignUpForm)

router.post("/signin", signIn)
router.post("/signup", signUp)

router.get("/dashboard",dashboardHandler)

module.exports=router