const UserSchema = require('../model/Users');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const EmailSend =require('./SendEmail')
const {CLIENT_URL} = process.env

const login = async (req, res)=>{
    try{
        const {email,password} =req.body;

        if(!email || !password){
            return  res.status(400).json({errormessage:"please enter all required fields"});
        }

        const user =await UserSchema.findOne({email});
        if(!user){
            return res.status(400).json({errormessage:"already use the email"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);


        if(passwordMatch){

            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = ActivationToken(payload);
            res.json({token:token});

        } else return res.status(401).json({msg:"Password is not Matching "})
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}

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



const getUserAll =async (req,res)=>{
    try{
        const users = await UserSchema.find().select('-password')

        res.json(users)
    }catch (e){
        console.log(e.message);
        return res.status(500).json({alert:"server Error"});
    }
}


const ActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'1h'})
}
function validateEmail(user_email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user_email).toLowerCase());
}
module.exports = {
    login,
    getSpecificUser,
    getUserAll
}
