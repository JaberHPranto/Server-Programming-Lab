const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const dotenv = require('dotenv')
const cors = require("cors");

const userRoute = require('./routes/userRoute')
const mathOlympiadRoute = require('./routes/mathOlympiadRoute')
const programmingContestRoute = require('./routes/programmingContestRoute')

const app = express()
dotenv.config()

// middleware
app.use(express.static("public"))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(cors());

// flash message
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash())


// setting template engine
app.set('view engine','ejs')

// routes
app.use("/math-olympiad",mathOlympiadRoute)
app.use("/programming-contest",programmingContestRoute)
app.use(userRoute)

// connect to mongodb
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) }))
    .catch((err) => console.log("Failed to start", err))

mongoose.set('useFindAndModify', false)