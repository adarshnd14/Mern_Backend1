const express = require('express')
require('dotenv').config()
const userRoute = require('./routes/userRoute.js')
const productRoute = require('./routes/productRoute.js')
const cors = require('cors')

// connecting DB
require('./config/db.js')

const app = express()

// to avoid cors error
app.use(cors())

// json middleware
app.use(express.json())

// app.use(express.urlencoded({extended:true}))

// router middleware
app.use('/', userRoute)
app.use('/products', productRoute)

//error handling middleware
app.use((err, req, res, next)=>{
    res.status(500).json({
        error:true,
        message:err.message,
        data:null
    })
})


module.exports = app