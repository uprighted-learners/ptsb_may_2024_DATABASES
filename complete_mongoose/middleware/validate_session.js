const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateSession = async (req, res, next) => {
    //? Middleware still has access to the req, res, and the requires the next() function to move past it.
    try{
    //? 1. Take the token, provided by the request object.-> headers.authorization
    const auth = req.headers.authorization;

    console.log(auth);

    if(!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1];

    if(!token) throw new Error("Unauthorized");
    //? 2. Check the status of the token. (expired) 
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    //* Verify (string, secret)

    console.log(decoded);

    const user = await User.findById(decoded.id);

    if(!user) throw new Error("User not found");

    req.user = user;

    return next();

    }catch(err){
        console.log(err)
        res.status(500).json({
            Error: err.message
        })
    }
} 


module.exports = validateSession;