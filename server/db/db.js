import mongoose from "mongoose";

const connectToMongooseDB = async () => {
    try {
        await mongoose.connect();
        console.log('Connected to MongoDB')
    } catch (error) {
        cpmsole.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongooseDB;