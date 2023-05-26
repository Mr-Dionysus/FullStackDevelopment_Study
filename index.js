const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

mongoose
    .connect("mongodb://127.0.0.1:27017/farmStand")
    .then(() => {
        console.log("Connection open");
    })
    .catch((err) => {
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const Product = require("./models/product");

app.get("/products", async (req, res) => {
    //Render All Products
    const products = await Product.find({});
    res.render("products/index", {products});
});

app.get("/products/new", (req, res) => {
    //Show New Product Page
    res.render("products/new");
});

app.post("/products", async (req, res) => {
    //Add New Product
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
    //Render Details about product
    const foundProduct = await Product.findById(req.params.id);
    res.render("products/detail", {foundProduct});
});

app.get("/products/:id/edit", async (req, res) => {
    //Edit Product Page
    const product = await Product.findById(req.params.id);
    res.render("products/edit", {product});
});

app.put("/products/:id", async (req, res) => {
    //Send Edited Product
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    await product.save();
    console.log(req.body);
    console.log(product);
    res.redirect(`/products/${product._id}`);
});

app.get("/products/:category");

app.listen(3000, () => {
    console.log("Connection to 3000 is approved");
});

// cd c:/Denis/Projects/'Web Development'/Study/"MongoDB with Express"
// node -i -e "$(< index.js)"
