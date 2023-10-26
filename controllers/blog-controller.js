import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs });
};

//add blog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "unable to find user by this ID" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    // await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

// update blog
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogID = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogID, {
      title,
      description,
    });
  } catch (error) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to update" });
  }
  return res.status(200).json({ blog });
};

// get by id

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "no Blogs found" });
  }
  return res.status(200).json({ blog });
};

// delete blog
export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(400).json({ message: "unable to delete" });
  }
  return res.status(200).json({ message: "blog deleted" });
};

//get particular user blog

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "no blogs found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
