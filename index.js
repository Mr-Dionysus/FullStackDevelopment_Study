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
    .catch(err => {
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const Product = require("./models/product");

//Render Products by Category or All Products
app.get("/products", async (req, res) => {
    const category = req.query.category;

    if (category != undefined && category != "all") {
        const name =
            "All " +
            category[0].toUpperCase() +
            category.slice(1) +
            " Products";
        const products = await Product.find({ category });
        res.render("products/index", { products, category, name });
    } else if (category === "all") {
        const name = "All Products";
        const products = await Product.find({});
        res.render("products/index", { products, category, name });
    }
});

//Show New Product Page
app.get("/products/new", (req, res) => {
    res.render("products/new");
});

//Add New Product
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

//Render Details about Product
app.get("/products/:id", async (req, res) => {
    const foundProduct = await Product.findById(req.params.id);
    res.render("products/detail", { foundProduct });
});

//Edit Product Page
app.get("/products/:id/edit", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("products/edit", { product });
});

//Send Edited Product
app.put("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
});

//Delete Product
app.delete("/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products?category=all");
});

app.listen(3000, () => {
    console.log("Connection to 3000 is approved");
});
