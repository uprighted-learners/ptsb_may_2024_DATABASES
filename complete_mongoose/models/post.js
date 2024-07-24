const mongoose = require("mongoose");

const User = require("./user")

const PostSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1
        },
        user_id: {
            type: mongoose.ObjectId,
            required: true,
            ref: User
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("post", PostSchema)