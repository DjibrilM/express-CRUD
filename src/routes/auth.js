import  express from 'express';
import { body } from 'express-validator';
import * as authControllers from "../controller/auth.js"
const route = express.Router();



route.post ('/signup',[
body('firstName', 'invalid first name ',)
.trim(),
body('secondName', 'invalid second name',)
.trim(),
body('email','invalid email')
.isEmail(),
body('password', 'invalid password ').isLength({min:6})
],authControllers.postSignup)

route.post('/signin',[
    body('email','invalid email').isEmail(),
    body('password','invalid password , the password must contain more than five characters').isLength({min:5})
],authControllers.login)



route.post('/getRest',[
    body('email', 'invalid email !').isEmail(),
    authControllers.GetResetPassword
])

route.post('/resetPassword',[
],authControllers.postResetPassword)



export default route

