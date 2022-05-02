const productSchema = require('../models/productSchema.js')

//adding product
const addproduct = async (req, res, next) => {
    const { pName, pPrice, pBrand, pDesc, pImg } = req.body
    try {
        const prodData = await productSchema.insertMany({
            pName,
            pPrice,
            pBrand,
            pDesc,
            pImg
        })
        res.status(200).json({
            error: false,
            message: 'Product succefully added',
            data: prodData
        })
    } catch (err) {
        next(err)
    }
}

//Getting product
const getproduct = async (req, res, next) => {
    try {
        const prodData = await productSchema.find()
        res.status(200).json({
            error: false,
            message: 'Successfully got the data',
            data: prodData
        })
    } catch (err) {
        next(err)
    }
}

//Edit product
const editproduct = async (req, res, next) => {
    const { pName, pPrice, pBrand, pDesc, pImg } = req.body
    const { _id } = req.query
    try {
        const prodData = await productSchema.updateOne({_id:_id},{
            $set:{
                pName, pPrice, pBrand, pDesc, pImg
            }
        })
        res.status(200).json({
            error: false,
            message: 'Successfully Edited',
            data: prodData
        })
    } catch (err) {
        next(err)
    }
}

//delete product
const deleteproduct = async (req, res, next) => {
    const { _id } = req.query
    try {
        const prodData = await productSchema.deleteOne({_id})
        res.status(200).json({
            error: false,
            message: 'Successfully deleted',
            data: prodData
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addproduct,
    getproduct,
    editproduct,
    deleteproduct
}