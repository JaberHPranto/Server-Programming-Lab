const express = require('express');
const {checkSignIn,addUserData} = require("../middlewares/auth")
const { getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC} = require('../controllers/programmingContestController')

const router = express.Router()


router.get("/register",checkSignIn,addUserData,getPC)
router.post("/register",checkSignIn,addUserData,postPC)
router.get("/list", checkSignIn,addUserData, getPCList)
router.get("/delete/:id",checkSignIn,addUserData,deletePC)
router.get("/paymentDone/:id",checkSignIn,addUserData,paymentDonePC)
router.get("/select/:id",checkSignIn,addUserData,selectPC)

module.exports = router