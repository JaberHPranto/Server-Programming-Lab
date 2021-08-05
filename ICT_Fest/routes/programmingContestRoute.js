const express = require('express');
const {checkSignIn,addUserData} = require("../middlewares/auth")
const { getPC,postPC} = require('../controllers/programmingContestController')

const router = express.Router()


router.get("/register",checkSignIn,addUserData,getPC)
router.post("/register",checkSignIn,addUserData,postPC)
// router.get("/list", checkSignIn,addUserData, getMOList)
// router.get("/delete/:id",checkSignIn,addUserData,deleteMO)
// router.get("/paymentDone/:id",checkSignIn,addUserData,paymentDoneMo)
// router.get("/select/:id",checkSignIn,addUserData,selectMo)

module.exports = router