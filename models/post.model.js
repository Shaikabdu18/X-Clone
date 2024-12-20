import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:[true,"Content is Required"],
        maxlength:400,
    },   
     media:[{ url: String, type: String }],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    visibility: { type: String, enum: ['Public', 'Followers', 'Private'], default: 'Public' },
    hashtags: [String],
}, { timestamps: true });

const Post = mongoose.model("Post",postSchema)

export default Post