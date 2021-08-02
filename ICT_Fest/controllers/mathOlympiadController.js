const express = require('express');
const checkSignIn = require("../middlewares/auth")
const { getMO,postMO,deleteMO,getMOList} = require('../controllers/mathOlympiadController')

const router = express.Router()

router.get("/register",checkSignIn,getMO)
router.post("/register",checkSignIn,postMO)

router.get("/list", checkSignIn, getMOList)
router.delete("/delete/:id",checkSignIn,deleteMO)


