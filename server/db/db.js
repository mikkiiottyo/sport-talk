import mongoose from "mongoose";

const connectToMongooseDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/SportTalk");
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongooseDB;