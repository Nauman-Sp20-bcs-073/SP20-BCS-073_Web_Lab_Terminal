
const mongoose = require("mongoose")

const ProductTable = mongoose.Schema({
    title:String,
    description:String,
    price:String
})

const productModel = mongoose.model("products", ProductTable)

module.exports = productModel