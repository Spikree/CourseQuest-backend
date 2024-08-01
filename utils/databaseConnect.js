import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log("connected to db")
    } catch (error) {
        console.log("Error connecting to db", error)
    }
}

export default connectDb;