//? Allows us to have sub routes in express
const router = require("express").Router()

//? Import bcrypt - to hash passwords
const bcrypt = require("bcrypt")

//? Import JWT - json web token
const jwt = require("jsonwebtoken")

//? Import User Model
const User = require("../models/user")






//? Export and make these routes avail to the root file (index.js)
module.exports = router;