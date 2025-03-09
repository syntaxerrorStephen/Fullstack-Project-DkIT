// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})


// Express
const express = require(`express`)
const app = express()

// Mongoose
const mongoose = require("mongoose")
const Product = require("./models/Product")



app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))


// Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/toonsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err))

// Port
app.listen(process.env.SERVER_PORT, () => 
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


// MongoDB - Get all products - Test
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: "Server error" })
    }
})

// MongoDB - Get one product by ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json(product)
    } catch (err) {
        res.status(500).json({ error: "Server error" })
    }
})



// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode) 
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})