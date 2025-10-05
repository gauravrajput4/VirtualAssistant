import mongoose from "mongoose";

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("MongoDB Connected");
    }catch(err){
        console.log("MongoDB not Connected");
    }
}

export default connectDB;