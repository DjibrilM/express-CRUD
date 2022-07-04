import usersModel from  '../models/user.js';


export const deleteRestToken = (email)=>{
setTimeout(() => {
    usersModel.find({email:email}).then(user=>{
        const ModifyUser = user[0];
        ModifyUser.resetToken = null;
        ModifyUser.save();
    })
    .catch(error=>{
        console.log(error)
    })
},300000);
}