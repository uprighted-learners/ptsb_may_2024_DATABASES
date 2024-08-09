//? Importing and applying dotenv, gives us access to env variables - process.env....
require("dotenv").config();

//TODO : seed the db eventually

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

//? Import our controller/s
const userController = require("./controllers/user_contoller")
const postController = require("./controllers/post_contoller")

//? Import validate-session
const validateSession = require("./middleware/validate_session")

//? Middleware to allow JSON to be accepted by our HTTP server
app.use(express.json())

//? Allow parsing of query strings
app.use(express.urlencoded({ extended: true }));

//? Allow our endpoints to be interacted with via web browser
app.use(cors({
    // Allows the server cookies to be sent over cross origin (if necessary)
    credentials: true,
    // Allow a white-list of IPs which can allow cross origin resource sharing
    origin: ["http://localhost:5173"]
}))

//? Using the controller
app.use("/user", userController)
// Use middleware here
app.use(validateSession)
app.use("/post", postController)

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
