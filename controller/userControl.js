const registerSchema = require('../models/registerSchema.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//registeration controller
const userRegister = async (req, res, next) => {
    console.log(req.body);

    //destructuring the response
    const { uName, uEmail, uPhone, uPassword, uRole } = req.body

    //checking for already existing data
    const email = await registerSchema.findOne({ uEmail })
    //if already exist show error status
    if (email) {
        res.status(409).json({
            error: false,
            message: 'You are already registered',
            data: null
        })
    } else {
        //else -> new user -> register process
        //hashing and salting password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const passHash = await bcrypt.hash(uPassword, salt)
        // console.log(passHash);

        //inserting data using try catch to database 
        try {
            const registerData = await registerSchema.insertMany({
                uName,
                uEmail,
                uPhone,
                uRole,
                uPassword: passHash
            })
            //sending success msg as a response
            res.status(201).json({
                error: false,
                message: 'successfully registered',
                data: registerData
            })
        } catch (err) {
            next(err)
        }
    }
}

//login
const userLogin = async (req, res, next) => {
    const { uEmail, uPassword } = req.body
    //Authentication
    try {
        const userValid = await registerSchema.findOne({ uEmail })
        //if valid login credentials 
        if (userValid) {
            //comparing hased password
            const pass = await bcrypt.compare(uPassword, userValid.uPassword)
            //if hased password matchs
            if (pass) {
                //jwt tocken generation
                const role = userValid.uRole
                const payload = { uEmail, uPassword, role }
                const token = jwt.sign(payload, process.env.SECRET_KEY)
                // console.log(token);

                res.status(200).json({
                    error: false,
                    message: 'successfully Login',
                    data: {
                        userValid,
                        token
                    }
                })
            } else {
                res.status(403).json({
                    error: true,
                    message: 'Pasword not match',
                    data: null
                })
            }
        } else {
            res.status(401).json({
                error: true,
                message: 'Credentials does not match',
                data: null
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userRegister,
    userLogin
}