const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("MongoDB is connected!!");
    } catch (error) {
        console.log("Error connecting to MongoDB", err);
        process.exit(1);
    }
};

module.exports = connectDB;