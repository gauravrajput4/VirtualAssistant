import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARYNAME,
        api_key: process.env.CLOUDINARYAPI,
        api_secret: process.env.CLOUDINARYSECRET,
    });

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath); // cleanup local file
        return uploadResult.secure_url;
    } catch (error) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        throw new Error("Cloudinary upload failed");
    }
};

export default uploadOnCloudinary;
