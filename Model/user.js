const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String, required:true, default:"User"},

    email:{
        type:String,
        required:true
    }, 

    password:{
        type:String,
        required:true,
        default:"admin"
    },

    profilePic:String,

})

const users = mongoose.model("users", userSchema)

module.exports=users;