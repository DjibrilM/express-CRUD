import express from "express";
const router = express.Router();
import { jwtVerification } from "../middlewares/is-auth.js";
import BlogControllers from "../controller/blogs.js";
import validation from "../helpers/express-validator.js";

// in this route we do some validations the blog
// title should be at least with a length of four characters
// and alphanimeric
// and the descriptions should contain
// more than 10 characters
//and should be also alphanimeric

router.post(
  "/create",
  validation.postBlog,
  jwtVerification,
  BlogControllers.createBlog
);

//route for geting blogs
router.get("/fetch", jwtVerification, BlogControllers.getBlogs);
//get  one single blog
router.get("/singleBlog/:id", jwtVerification, BlogControllers.getSingleBlog);
//get update blog
router.get("/getUpdate/:id", jwtVerification, BlogControllers.getupdate);

//post update  blog
router.post(
  "/postUpdate",
  validation.postUpdate,
  jwtVerification,
  BlogControllers.postBlogUpdate
);

// router.delete('/delete',jwtVerification,blogControllers.deleteBlog)

export default router;
