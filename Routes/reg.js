const express = require("express")
const cookie = require("cookie-parser")
const bcrypt = require("bcryptjs")
const user = require("../Model/user")
const jwt=require('jsonwebtoken')


const router = express.Router()

router.get("/register" , (req,res)=>{
    res.render("signup.ejs")
})

// registeration
router.post("/register",  async (req,res,next)=>{

let userExist = await user.findOne({email:req.body.email})

if (userExist) {return res.send("User With This ID Already Exists!")}
const userData=new user();
const salt = await bcrypt.genSalt(12)
let encryptedPass = await bcrypt.hash(req.body.password, salt)

userData.name = req.body.name
userData.email = req.body.email
userData.password = encryptedPass

await userData.save()
res.json({message:'User Successfully Registered.'})

})

// render login page for server side
router.get("/Login", (req, res)=>{
    return res.render("login.ejs")
})

router.post('/login',async (req,res)=>{
    const registeredUser=await user.findOne({email:req.body.email});
    if(!registeredUser) return res.status(401).json({message:'User is not registered.'});

    const isValid=await bcrypt.compare(req.body.password,registeredUser.password);
    if(!isValid) return res.status(401).send('Invalid Password');

   const token=jwt.sign({
    _id:registeredUser._id
   },'jwtTokenKeySecret')

   req.session.user=registeredUser;

// 'tokenInCookie' here is variable name in which we store token
// we can also give expiry of the cookie (milli seconds)
res.cookie('tokenInCookie',token,{expires:new Date(Date.now() + 500000)});

return res.send(token)

//when assign res.cookie, when retrieve req.cookies.token
})

router.get("/:email", async (req, res, next)=>{
    let userInfo = await User.findOne({email:req.params.email})
    if(userInfo){
    console.log("User Info: email= " + userInfo.name)
    return res.send(userInfo) // send user object if email is validated
    }
    else 
    return res.send(false)
  
  })

module.exports=router;

