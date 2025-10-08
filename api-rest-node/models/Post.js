const { Schema, model } = require("mongoose");

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.png"
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = model("Post", PostSchema, "posts");