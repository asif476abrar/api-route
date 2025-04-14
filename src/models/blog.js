import mongoose from "mongoose";

//database
//models
//api routes --> add, fetch/get, update, delete   (HTTP requests)

const BlogSchema = new mongoose.Schema({
  title : String,
  description : String,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema); //This line ensures the Blog model is created and avoids creating duplicate models if it already exists.the || (logical OR) operator is used to check whether a Mongoose model named "Blog" already exists before creating a new one.
export default Blog;