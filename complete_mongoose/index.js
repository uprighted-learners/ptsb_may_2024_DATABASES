//? Importing and applying dotenv, gives us access to env variables - process.env....
require("dotenv").config();

//TODO : get the seed data

//? Importing express
const express = require("express");

//? Import Cors 
const cors = require("cors");

//? Import Mongoose
const mongoose = require("mongoose");

//? Connection URL variable form .env file
const MONGODB = process.env.MONGO_DB_URL + process.env.MONGO_DB_NAME

//? Connection middleware, connecting to the DB
mongoose.connect(MONGODB)

//? Store the connection status
const db = mongoose.connection

//? Event listener to check if connected
db.once("open", async () => {
    console.log("*".repeat(10));
    console.log(`Connected successfully to database: \n ${MONGODB}`);
    console.log("*".repeat(10));
})

const PORT = process.env.PORTNUMBER || 8080;
const app = express();

//? Connection to spin up the server
app.listen(PORT,() => {
    console.log("*".repeat(10));
    console.log(`Server is connected: ${PORT}`);
    console.log("*".repeat(10));
})

//? Create a collection - tmp model to seed data
const ProductModel = mongoose.model("product", new mongoose.Schema({
    emoji: String,
    name: String,
    quantity: Number,
    price:  Number,
    tags: Array
}))
