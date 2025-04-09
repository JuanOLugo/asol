import mongoose from "mongoose";

const URI: string | undefined = process.env.MONGODB_URI;

export const connectDb = async () => {
    try {
        await mongoose.connect(URI ? URI : "mongodb://127.0.0.1:27017/asol");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}


export const disconnectDb = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}