import userModel  from "../models/user.js";


//get user profile 
export const PublicProfile = async (req,res,next)=>{
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
    console.log(userId, 'user id')
    try {
    const user = await userModel.findById(userId).select('firstName  secondName email  profileImagePath')
    const userBlogs  = await blogModel.find({creator:userId});
        
    res.status(202).json({message:'data loaded', user:user,blogs:userBlogs})
    } catch (error) {
    console.log(error);
    res.status(500).json({message:'something went wrong please try again'});
    }  
}