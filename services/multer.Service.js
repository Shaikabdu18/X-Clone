import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'X-Clone/posts', // Folder to store media
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4'], // Specify allowed formats
    },
});

const upload = multer({ storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

// console.log("Cloudinary Config in Storage:", cloudinary.config());

export default upload;
