import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to test upload
const testUpload = async () => {
    try {
        const response = await cloudinary.uploader.upload("./1731307224453shaik.jpg", {
            folder: "X-Clone/posts",
        });
        console.log("Upload successful:", response);
    } catch (error) {
        console.error("Upload error:", error);
    }
};

testUpload();
