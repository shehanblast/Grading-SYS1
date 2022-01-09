const UserSchema = require('../model/Users');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const EmailSend =require('./SendEmail')
const {CLIENT_URL} = process.env
//
// const login = async (req, res)=>{
//     try{
//         const {email,password} =req.body;
//
//         if(!email || !password){
//             return  res.status(400).json({errormessage:"please enter all required fields"});
//         }
//
//         const user =await UserSchema.findOne({email});
//         if(!user){
//             return res.status(400).json({errormessage:"already use the email"});
//         }
//
//         const passwordMatch = await bcrypt.compare(password, user.password);
//
//
//         if(passwordMatch){
//
//             const payload = {
//                 user: {
//                     id: user.id
//                 }
//             };
//             const token = ActivationToken(payload);
//             res.json({token:token});
//
//         } else return res.status(401).json({msg:"Password is not Matching "})
//     }catch (e){
//         console.log(e.message);
//         return res.status(500).json({alert:"server Error"});
//     }
// }

const getSpecificUser = async (req,res) =>{
    try {
        const user = await UserSchema.findById(req.params.id).select('-password')
            .then(data => {
                res.status(200).send({data: data});
            })
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


// const getSpecificAdminUsers = async (req, res) => {
//     try {
//         if (req.params && req.params.id) {
//             await UserSchema.findById(req.params.id)
//                 .then(response => {
//                     res.status(200).send({data: response});
//                 })
//                 .catch(error => {
//                     res.status(500).send({error: error.message});
//                 });
//         }
//     }catch (e){
//         console.log(e.message);
//         return res.status(500).json({msg:"server Error..."});
//     }
// }


// const forgotPassword = async (req, res)=>{
//     try{
//         const {email} = req.body;
//
//         const user =await UserSchema.findOne({email});
//         if(!user){
//             return res.status(400).json({errormessage:"already use the email"});
//         }
//
//         const access_jwt_token  = ActivationToken({id:user._id});
//
//         const url =`${CLIENT_URL}/users/reset_password/${access_jwt_token}`
//
//         EmailSend(email,url,"Reset Your Password");
//
//         res.status(200).json({alert:"please check the email"});
//
//     }catch (e){
//         console.log(e.message);
//         return res.status(500).json({alert:"server Error"});
//     }
// }


const getUserAll =async (req,res)=>{
    try{
        const users = await UserSchema.find().select('-password')

        res.json(users)
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}

// const updateProfile = async (req,res)=>{
//     try{
//         const {firstName,lastName,address,mobileNo,imageUrl} =req.body
//         await UserSchema.findOneAndUpdate({_id:req.user.id},{
//             firstName,lastName,address,mobileNo,imageUrl
//         })
//         res.status(200).json({alert:"update Successful"})
//     }catch (e){
//         console.log(e.message);
//         return res.status(500).json({alert:"server Error"});
//     }
// }

// const deleteUsers = async (req, res) => {
//     if (req.params && req.params.id) {
//         console.log(req.params.id);
//         await UserSchema.findByIdAndDelete(req.params.id)
//             .then(() => res.json('User Deleted Successful!'))
//             .catch(error => {
//                 res.status(500).send({ error: error.message });
//             });
//     }
// }

const ActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'1h'})
}
function validateEmail(user_email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user_email).toLowerCase());
}
module.exports = {
    // login,
    getSpecificUser,
    // forgotPassword,
    // resetPassword,
    // updateProfile,
    // deleteUsers,
    getUserAll,
    // getSpecificAdminUsers,
    // ResetPasswordUser
}
