const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000
const route = require('./route/routes')
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log(" Mongo DB connected ...")
    })
    .catch((e) => {
        console.error("Mongo connection error", e)
    })

app.use('/', route)

app.listen(PORT, () => {
    console.log("Server running on port--", PORT)
})
