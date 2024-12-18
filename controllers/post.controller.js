import Post from "../models/post.model.js";

export const createPost = async(req,res,next)=>{
    try {
        const { content, visibility } = req.body;
       
        

        // Extract media URLs from Cloudinary responses
        const media = req.files.map(file => file.path); // Extract only the URL


        // Create a new post
        const post = new Post({
            content,
            media, // Store URLs array in the database
            visibility,
            user: req.user.id,
        });

        await post.save();

        res.status(201).json({msg:"post Updated successfully"});
    } catch (error) {
        console.log("hi");
        
        next(error)
    }
}