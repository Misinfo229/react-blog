const mongoose = require("mongoose");

const connection = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/mc_blog");
        console.log("Connection successful");
    } catch (error) {
        console.log(error);
        throw new Error("Could not connect to the database");
    }
}

module.exports = {
    connection
}