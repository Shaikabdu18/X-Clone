import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:"Please Provide a Valid Email"
        }
     },
    password: { type: String, required: true , minlength:6},
    role: { type: String, enum: ['Admin', 'Moderator', 'User'], default: 'User' },
    profile: {
        bio: String,
        profilePicture: String,
        location: String,
        website: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

userSchema.pre("save",async function (next) {
    if(! this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    return next()
})
const User = mongoose.model("User",userSchema)

export default User