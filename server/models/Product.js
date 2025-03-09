const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: [String],
    isFeatured: Boolean,
    tags: [String],
    category: String,
    stock: Number
})

module.exports = mongoose.model("Product", ProductSchema)
