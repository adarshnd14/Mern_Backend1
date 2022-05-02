const mongoose = require('mongoose')

//schema for product data
const productSchema = new mongoose.Schema({
    pName: {
        type: String,
        required: true
    },
    pBrand: {
        type: String
    },
    pDesc: {
        type: String,
        required: true
    },
    pPrice: {
        type: Number,
        required: true
    },
    pImg:{
        type:String,
        
    }
})

module.exports = mongoose.model('products', productSchema, 'productData')