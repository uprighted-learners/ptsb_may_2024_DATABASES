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
        Msg: "Success, User Created!",
        Token: token
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      Error: err.code === 11000 ? "Error Signing up" : err.message
    });
  }
});

//? Post Request - Signin
router.post("/signin", async(req,res) => {
  try{
    let {email, pass} = req.body

    const user = await User.find({email: email})

    if(user.length === 0) {
      throw new Error("Incorrect email or password")
    }

    let passwordMatch = await bcrypt.compare(pass, user[0].password)

    if(!passwordMatch) throw new Error("Incorrect email or password")

    const token = jwt.sign({id: user[0]._id}, process.env.JWT_SECRET, {expiresIn: "1 day"})
    
    res.status(200).json({
      Msg: "User signed In!",
      User: user[0],
      Token: token
    })

  }catch(err){
    res.status(500).json({
      Error: err.message
    })
  }
})



//? Export and make these routes avail to the root file (index.js)
module.exports = router;
