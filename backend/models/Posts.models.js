import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id:Number,
    userid: Number,
    content:String,
});

const Posts= mongoose.model("Post",postSchema);

export default Posts;