const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const moment = require('moment');

const UsersSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true , "Please enter your firstName!"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true , "Please enter your lastName!"],
        trim:true
    },
    email:{
        type:String,
        required:[true , "Please enter your email!"],
        trim:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:[true , "Please enter Mobile Number"],
    },
    address:{
        type:String,
        required:[true , "Please enter your Address"],
        trim:true
    },
    position:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:[true , "Please enter your password"],
    },
    imageUrl:{
        type:String,
        default:"https://res.cloudinary.com/pjk12755/image/upload/v1623394380/PikPng.com_profile-icon-png_805523_zbl9ji.png"
    }
},{
    timestamps:true
});


const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;