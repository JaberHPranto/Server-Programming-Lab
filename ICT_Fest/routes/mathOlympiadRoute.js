const express = require('express');
const {checkSignIn,addUserData} = require("../middlewares/auth")
const { getMO,postMO,deleteMO,getMOList,paymentDoneMo,selectMo,editMo,postEditMo} = require('../controllers/mathOlympiadController')

const router = express.Router()


router.get("/register",checkSignIn,addUserData,getMO)
router.post("/register",checkSignIn,addUserData,postMO)
router.get("/list", checkSignIn,addUserData, getMOList)
router.get("/delete/:id",checkSignIn,addUserData,deleteMO)
router.get("/paymentDone/:id",checkSignIn,addUserData,paymentDoneMo)
router.get("/select/:id",checkSignIn,addUserData,selectMo)
router.get("/edit/:id",checkSignIn,addUserData,editMo)
router.post("/edit-participant",checkSignIn,addUserData,postEditMo)

module.exports = router

