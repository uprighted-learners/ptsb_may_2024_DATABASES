const router = require("express").Router();

const Post = require("../models/post");

router.post("/create/:id", async (req,res) => {

    try{
        let post = await Post.create({
            text: req.body.text,
            user_id: req.params.id // === 66a1853b6e9fd243bec0696a
        }) 

        res.status(200).json({
            Created: post
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            Error: err
        })
    }
})

router.get("/mine/:userId", async (req,res)=> {
    try{

    let results = await Post.find({user_id: req.params.userId}).select({
        text: 1,
        createdAt: 1,
        updatedAt: 1
    })

    res.status(200).json({
        Results: results
    })

    }catch(err){
        res.status(500).json({
            Error: err
        })
    }
})

router.get("/all", async(req,res) => {
    try{
        //? .populate will assist in showing relationship data
        let results = await Post.find().populate("user_id", ["firstName","lastName"]).select({
            text: 1,
            createdAt: 1,
            updatedAt: 1
        })

        res.status(200).json({
            Results: results
        })
        
    }catch(err){
        res.status(500).json({
            Error:err.message
        })
    }
})

router.patch("/update/:id", async (req,res)=> {
    try{

        let newInfo = req.body;

        let result = await Post.findByIdAndUpdate(req.params.id, newInfo, {
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

router.delete("/delete/:id", async(req,res) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id);

        const allResults = await Post.find().populate("user_id", ["firstName", "lastName"])

        res.status(200).json({
            Deleted: post,
            Results: allResults
        })

    }catch(err){
        res.status(500).json({
            Error: err.message
        })
    }
})



module.exports = router