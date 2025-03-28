import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:String,
    name: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
});

const User= mongoose.model("User",userSchema);

export default User;