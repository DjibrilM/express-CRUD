// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const {validationResult}=  require('express-validator')
// const userModel = require('../models/user');
// const RestExpireFunc = require('../helpers/auth')
// const nodemailer = require("nodemailer");
// const sendGrideTransport = require("nodemailer-sendgrid-transport");
// const blogModel = require('../models/blog')
// const JWT = require('jsonwebtoken')


import bcrypt from "bcrypt";
import {validationResult} from "express-validator";
import { deleteRestToken } from "../helpers/auth.js";
import {createTransport} from "nodemailer";
import sendGrideTransport from "nodemailer-sendgrid-transport";
import blogModel from "../models/blog.js"
import userModel  from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv  from "dotenv";
import {randomBytes} from "crypto";

dotenv.config();

//send grid api key 
const SEND_GRID_KEY = process.env.SENDGRIDKEY;
const transporter = createTransport(
    sendGrideTransport({
      auth: {
        api_key:
        SEND_GRID_KEY
      }
    })
  );

/* the following function trigger the the user signed up.
for signed up user should provide the password 
first name  second name and email.

for the password the password will be crypted so that even 
the administrator will not be able to login with clients accounts

and after singed up the front end receive  the 
JWT token for login which expies after 5hours 
and that is why we also provide the a refersh token 

NB:JWT is not yet introduced it will be introduced  
*/
export const postSignup  = async (req,res,next)=>{
const firstName = req.body.firstName;
const secondName = req.body.secondName;
const email = req.body.email;
const userProfileImage = req.files;
const password = req.body.password;



if(!userProfileImage[0]){
return res.status(403).json({message:'profile image is required !'});
}

const  validationErrror = validationResult(req)

  if(!validationErrror.isEmpty()){
  res.status(400).json({message:'validation failed check your input ',
  error:validationErrror.array()})
  return next();
  }


  try {
      const findExistingUser = await userModel.find({email:email});
      if(findExistingUser[0]){
      res.status(400).json({message:'the following email already exist.'})
      return next()
      }
  } catch (error) {
      res.status(500).json({message:"something went wrong with our system, please come back later."})
  }
 

 try {
     const cryptPassword = await bcrypt.hash(password,12);
     const userData = new userModel({
        firstName:firstName,
        secondName:secondName,
        email:email,
        password:cryptPassword,
        profileImagePath:userProfileImage[0].path
     })
    
     const save = await userData.save();
     
    //generate the JWT token 
    const jwt = jsonwebtoken.sign({email:save.email,id:save._id},
    '66b0c36b16246afa30d35eaea1fdf71c6aec2bdd075a4d226a0ae33897b63e86',{expiresIn:'3h'}); 
     res.status(202).json({message:'you have been successfully signed up.',data:save,token:jwt})

 } catch (error) {
     console.log(error)
     res.status(500).json({message:'something went wGetResetPasswordrong with our system.'})
 }

}


export const login = async (req,res,next)=>{
const email = req.body.email;
const password = req.body.password;

const validationErrror = validationResult(req)

// console.log(validationErrror.array())
// console.log(validationErrror.isEmpty())
 if(!validationErrror.isEmpty()){
 res.status(400).json({message:'validation faild check your input',
 error:validationErrror.array()})
 return next();
 }

try {
    const user = await userModel.find({email:email})
    if(!user[0]){
        res.status(404).json({message:'No existing user  with This email. '})
    }

    const ValidateTheThePassword = await bcrypt.compare(password , user[0].password);
    //password verfication 
    if(!ValidateTheThePassword){
        res.status(400).json({message:'invalid password ',})
        return next();
    }
    const jwt = jsonwebtoken.sign({email:user[0].email,id:user[0]._id},
    '66b0c36b16246afa30d35eaea1fdf71c6aec2bdd075a4d226a0ae33897b63e86',{expiresIn:'3h'}); 

        
   const modifiedUser = {
    firstName:user[0].firstName,
    secondName:user[0].secondName,
    profileImagePath:user[0].profileImagePath,
    email:user[0].email,
    id:user[0]._id
   }

  
    res.status(202).json({message:'you have successfully login',data:modifiedUser,token:jwt})
} catch (error) {
    console.log(error)
    res.status(500).json({message:'something went wrong with our system please come back later.'})
}

}



//this function will send the reset link to the 
//user who want to rest the password  

export const GetResetPassword = async (req,res,next)=>{
const email = req.body.email;

try {
    const user = await userModel.find({email:email});
    if(!user[0]){
        console.log('no user found with this email')     
    }

 
    /*this little if statement check if the user has requested a password reset token ,
     if he(she) has one in this case the user will wait until the previous one expires then after that the user will gain again
     access to request a new one 
     */
    if(user[0].resetToken ){
        return res.status(403).json({message:'wait until the link expires'})
    }
   
   //generate the reset token 
    const token = await randomBytes(32).toString('hex')
    user[0].resetToken = token ;
    const save = await user[0].save();

    //set the token expiration time  which is 5minutes max
    deleteRestToken(user[0].email);
     transporter
    const sendEmail = await transporter.sendMail({
        to:user[0].email,
        from:'mugishodjibril2004@gmail.com',
        subject:'rest password',
        html:`<h3 style="background red">http://localhost:8080/authentication/restePassword/${token}</h3>`
    })

    res.status(202).json({message:'token sent'});

} catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong please try again!"});
}

}



//this function will reset the password 
export const postResetPassword = async (req,res,next)=>{
const password = req.body.password;
const Token = req.body.token ;

try {
    const user  = await userModel.find({resetToken:Token});
    if(!user[0]){
      return  res.status(403).json({message:'enable to reste the password please make sure that the the link has not yet expired'})
    }

    //in this case no data will be send beacause the returned
    //data contain all the user informations 
    const save = await user[0].save();
    res.status(202).json({message:'password reseted'})
    
} catch (error) {
    console.log(error);
    return res.status(500).json({message:'something went wrong please try again !'})
}

}



//get user profile 
export const PubliProfile = async (req,res,next)=>{
const userId = req.params.id;
console.log(userId, 'user id')
try {
const user = await userModel.findById(userId).select('firstName  secondName  profileImagePath')
const userBlogs  = await blogModel.find({creator:userId});

res.status(202).json({message:'data loaded', user:user,blogs:userBlogs})
} catch (error) {
console.log(error);
res.status(500).json({message:'something went wrong please try again'});
}
}

//get the private profile : this will be available  for the owner of the account only
export const getPrivateProfile = async(req,res,next)=>{
    console.log(req.user);
    const userId = req.user._id;
    try {
    const user = await userModel.findById(userId).select('firstName  secondName email  profileImagePath')
    const userBlogs  = await blogModel.find({creator:userId});
    
    res.status(202).json({message:'data loaded', user:user,blogs:userBlogs})
    } catch (error) {
    console.log(error);
    res.status(500).json({message:'something went wrong please try again'});
    }  
}




