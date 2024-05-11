import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    username: String,
    content: String,
    date: String,
});

export default mongoose.model("Post", postSchema);
