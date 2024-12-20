import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async(req,res,next)=>{
    try {
        const { content, visibility } = req.body;
       
        const media = req.files.map(file => file.path); // Extract only the URL

        const post = new Post({
            content,
            media, 
            visibility,
            user: req.user.id,
        });

        await post.save();

        res.status(201).json({msg:"post Updated successfully"});
    } catch (error) {
         next(error)
    }
}

export const getPost = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch the user and their following list
        const user = await User.findById(userId)
        // console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { page = 1, limit = 10 } = req.query; // Default page: 1, limit: 10


        // Extract the IDs of the followed users
        const followingIds = user.following.map(followedUser => followedUser._id);
        console.log(followingIds);
        

        // Fetch posts from the followed users, sorted by creation date (newest first)
        const posts = await Post.find({ user: { $in: followingIds } })
            .populate('user', 'username') // Include user info like username
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

            const totalPosts = await Post.countDocuments({ user: { $in: user.following } });


        // Respond with the fetched posts
        res.json({ posts,
            totalPosts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalPosts / limit),});
    } catch (error) {
        next(error);
    }
};
