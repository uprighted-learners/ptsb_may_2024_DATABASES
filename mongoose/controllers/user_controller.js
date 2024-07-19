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
//? GET - Get a user by id
router.get("/one/:id", async(req,res) => {
    try{    
            const user = await User.findById(req.params.id).select({
                firstName: 1, lastName: 1, email: 1
            })

            
            res.status(200).json({
                User: user
            })

    }catch(err){
        res.status(500).json({
            Error: err.message
        })
    }
})
//? GET - Get a user by name
router.get("/name/:name", async(req,res) => {
    try{    
            const user = await User.find({
                firstName: { $in: [req.params.name]}
            }).select({
                firstName: 1, lastName: 1, email: 1
            })

            res.status(200).json({
                User: user
            })

    }catch(err){
        res.status(500).json({
            Error: err.message
        })
    }
})
//? DELETE - Remove a user
router.delete("/delete/:id", async(req,res) => {
    try{    
       
        const user = await User.findByIdAndDelete(req.params.id)

        const allResults = await User.find().select({
            firstName: 1, lastName: 1, email: 1
        })

        if(!user){
            throw new Error("User not found")
        }

        res.status(200).json({
            Deleted: user,
            Results: allResults
        })


    }catch(err){
        res.status(500).json({
            Error: err.message
        })
    }
})

//? PUT - Update a user
router.put("/update/:id", async(req,res) => {
    try{    

       let newInfo = req.body
       let result = await User.findByIdAndUpdate(req.params.id, newInfo, {
        new: true
       })

       res.status(200).json({
            Result: result
       })
        
    }catch(err){
        res.status(500).json({
            Error: err.message
        })
    }
})




module.exports = router;