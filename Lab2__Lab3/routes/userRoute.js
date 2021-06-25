const express = require('express');
const { signIn, signUp } = require('../controllers/userController')

const router = express.Router()

router.get("/",(req,res) => {
    res.send("This is a user route")
})

router.post("/signin", signIn)
router.post("/signup", signUp)

module.exports=router