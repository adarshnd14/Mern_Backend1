const mongoose = require('mongoose')

//creating schema for register
const registerSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true
    },
    uEmail: {
        type: String,
        required: true
    },
    uPhone: {
        type: Number,
        required: true
    },
    uRole: {
        type: String,
        required: true
    },
    uPassword: {
        type: String,
        required: true
    }
})

//naming collection in 3rd parameter
module.exports = mongoose.model('registeration', registerSchema, 'registerData')