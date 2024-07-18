// Import dotenv, allowing us access to the .env environment variables
require("dotenv").config();

const express = require("express");
const app = express();

const myPort = process.env.PORT || 8080;

const mongoose = require("mongoose");
const MONGODB = process.env.MONGO_DB;

// Import controller
const userController = require("./controllers/user_controller")

// Allows our server to receive JSON
app.use(express.json())

// Connection middleware
mongoose.connect(MONGODB);

// Reserve connection to db;
const db = mongoose.connection;

app.use("/user", userController)

// Adding event to our database, when a connection opens up to it,
db.once("open", () => {
    console.log(`Connected: ${MONGODB}`);
})

app.listen(myPort,() => {
    console.log(`Server is running on port: ${myPort}`);
})