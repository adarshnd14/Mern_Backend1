const express = require('express')
const productRoute = express.Router()
const productControl = require('../controller/productControl.js')
const adminAuth = require('../middlewares/auth.js')

//addproduct route
productRoute.post('/addproduct', adminAuth.adminAuth, productControl.addproduct)
//getproduct route
productRoute.get('/product', productControl.getproduct)
//editproduct route
productRoute.put('/editproduct', adminAuth.adminAuth, productControl.editproduct)
//deleteproduct route
productRoute.delete('/deleteproduct', adminAuth.adminAuth, productControl.deleteproduct)

module.exports = productRoute