const express = require('express');
const {checkSignIn,addUserData} = require("../middlewares/auth")
const { getMO,postMO,deleteMO,getMOList} = require('../controllers/mathOlympiadController')

const router = express.Router()


router.get("/register",checkSignIn,addUserData,getMO)
router.post("/register",checkSignIn,addUserData,postMO)

router.get("/list", checkSignIn,addUserData, getMOList)
router.delete("/delete/:id",checkSignIn,addUserData,deleteMO)

module.exports = router
