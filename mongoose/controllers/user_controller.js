const router = require("express").Router();
const User = require("../models/user_model")


//? POST - Create new user
router.post("/create", async(req,res) => {
    try{
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    const newUser = await user.save()

    res.status(200).json({
        user: newUser,
        msg: "Success! User was created!"
    })

    }catch(err){
        res.status(500).json({
            Error: err.code = 11000 ? "Unable to signup" : err.message
        })
    }
})

//? GET - Get all users
router.get("/all", async(req,res) => {
    try{    
        const users = await User.find().sort("firstName").select({
            firstName: 1, lastName: 1, email: 1
        });

        res.status(200).json({
            AllUsers: users
        })
    }catch(err){
        res.status(500).json({
            Error: err.message
        })
    }
})



module.exports = router;