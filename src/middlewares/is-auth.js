
import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user.js"


export const jwtVerification  =   async (req,res,next)=>{
const authheader = req.get('authorization');
if(!authheader){
   return res.status(403).json({message:'authentication faild !'})
}
const token = req.get('authorization').split(' ')[1];
let decodedToken ;


try {
    decodedToken = jsonwebtoken.verify(token, '66b0c36b16246afa30d35eaea1fdf71c6aec2bdd075a4d226a0ae33897b63e86')
    if(!decodedToken){
        return res.status(403).json({message:'Authentication failed   ! '})
    }
    const user = await userModel.findById(decodedToken.id)
    req.user = user;
    next()    

} catch (error) {
    console.log(error)
    res.status(500).json({messge:'something went wrong '});
}
}

