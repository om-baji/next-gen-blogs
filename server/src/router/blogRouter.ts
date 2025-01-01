import { Hono } from "hono";
import { BlogController } from "../controller/blogController";

export const blogRouter = new Hono();

blogRouter
    .get("/",BlogController.getBlogs)
    .get("/:email",BlogController.getBlogsByEmail)
    .post("/",BlogController.postBlogs)
    .put("/",BlogController.putBlog)
    .delete("/",BlogController.deleteBlog)

