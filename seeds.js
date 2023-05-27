const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
    .connect("mongodb://127.0.0.1:27017/farmStand")
    .then(() => {
        console.log("Connection to MongoDB is open");
    })
    .catch(err => {
        console.log(err);
    });

const seedProducts = [
    {
        name: "Banana",
        price: 1,
        category: "fruit",
    },
    {
        name: "Cucumber",
        price: 5,
        category: "vegetable",
    },
    {
        name: "Tomato",
        price: 4.5,
        category: "vegetable",
    },
    {
        name: "Chicory",
        price: 2.5,
        category: "vegetable",
    },
];

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
