const mongoose = require("mongoose");

//connect db
const db = "mongodb+srv://pankajsuthar27302:pankajsuthar@cluster0.ysbw1vb.mongodb.net/";

const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected.");
    }
    catch{
        console.log("Failed to connect with MongoDB.");
    }
}

module.exports = connectDB;