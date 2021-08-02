const express = require('express');
const { signIn, signUp, getSignInForm, getSignUpForm, dashboardHandler, logout } = require('../controllers/userController')
const { homePage, pageNotFound } = require('../controllers/basicController')
const {checkSignIn,addUserData} = require("../middlewares/auth")

const router = express.Router()

router.get("/", homePage)


router.get("/login", getSignInForm)
router.get("/register", getSignUpForm)

router.post("/login", signIn)
router.post("/register", signUp)

router.get("/logout",logout)

router.get("/dashboard",checkSignIn,addUserData, dashboardHandler)

// Error page
router.use(pageNotFound)

module.exports=router