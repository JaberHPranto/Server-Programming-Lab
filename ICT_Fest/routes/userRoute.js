const express = require('express');
const { signIn, signUp, getSignInForm, getSignUpForm, dashboardHandler, logout } = require('../controllers/userController')
const { homePage, pageNotFound } = require('../controllers/basicController')
const checkSignIn = require("../middlewares/auth")

const router = express.Router()

router.get("/",homePage)

router.get("/signin", getSignInForm)
router.get("/signup", getSignUpForm)

router.post("/signin", signIn)
router.post("/signup", signUp)

router.get("/logout",logout)

router.get("/dashboard", checkSignIn, dashboardHandler)

// Error page
router.use(pageNotFound)

module.exports=router