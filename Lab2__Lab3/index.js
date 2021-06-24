const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// middleware
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors())

app.get('/',(req,res) => {
    res.send('Welcome')
})

// connect to mongodb
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) }))
    .catch((err) => console.log("Failed to start", err))

mongoose.set('useFindAndModify', true)