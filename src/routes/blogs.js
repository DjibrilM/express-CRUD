
import express from "express"
const router = express.Router()
import {body}  from "express-validator";
import {jwtVerification} from '../middlewares/is-auth.js'
import * as blogControllers  from "../controller/blogs.js"

// in this route we do some validations the blog
// title should be at least with a length of four characters
// and alphanimeric
// and the descriptions should contain
// more than 10 characters
//and should be also alphanimeric
router.post('/create',
[
body('title','the title should be at least with four caracters')
// .isAlphanumeric()
.isLength({min:4}),
body('description','the description should of 10 characters as the minimum')
// isAlphanumeric()
.isLength({min:10})
],
jwtVerification , blogControllers.createBlog
);


//route for geting blogs
router.get('/fetch', jwtVerification, blogControllers.getBlogs);
//get  one single blog
router.get('/singleBlog/:id', jwtVerification, blogControllers.getSingleBlog);
//get update blog
router.get('/getUpdate/:id', jwtVerification ,  blogControllers.getupdate)
//post update  blog
router.post('/postUpdate',[
body('title','the title should be at least with four caracters')
    // .isAlphanumeric()
.isLength({min:4}),
body('description','the description should of 10 characters as the minimum')
 // isAlphanumeric()
    .isLength({min:10})
],jwtVerification,blogControllers.postEditBlog);

// router.delete('/delete',jwtVerification,blogControllers.deleteBlog)


export default   router
