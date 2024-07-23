//? Allows us to have sub routes in express
const router = require("express").Router();

//? Import bcrypt - to hash passwords
const bcrypt = require("bcrypt");

//? Import JWT - json web token
const jwt = require("jsonwebtoken");

//? Import User Model
const User = require("../models/user");

//? Post Req - Signup
router.post("/signup", async (req, res) => {
  try {
    // const user = new User({
    //     firstName: req.body.first,
    //     lastName: req.body.last,
    //     email: req.body.email,
    //     password: req.body.pass
    // })

    // const newUser = await user.save()

    //? OR

    let newUser = await User.create({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.pass, 12),
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn: "2 days"});

    res.status(200).json({
        Created: newUser,
        Token: token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//? Export and make these routes avail to the root file (index.js)
module.exports = router;
