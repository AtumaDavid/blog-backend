import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getByUserId,
  updateBlog,
} from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog); //blog id
blogRouter.get("/:id", getBlogById); //blog id
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

export default blogRouter;

// 653a8760544e2b375787925f

// 653a8a182d8f72e4f98213df
