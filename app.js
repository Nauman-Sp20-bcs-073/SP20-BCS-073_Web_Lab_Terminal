
const { json } = require("body-parser")
const express = require("express")
const userrouter=require('./Routes/routes')
const regRoute = require("./Routes/reg")
const todoRoute = require ("./Routes/todoRoute")
const cookieParser=require('cookie-parser')
const session=require('express-session')
const app = express()
const mongoose = require("mongoose")

const cors=require('cors');

app.set("view engine", "ejs")

//const ProductTable = require("./Model/SchemaOfProducts.js")

app.use(express.urlencoded({ extended: false }))
app.use(json())
app.use(cookieParser());
app.use(cors()); //used to send and receive requests/req from other domains.
app.use(session({
    secret:'Secret Session',
    saveUninitialized:false,
    resave:false

}))

//to mark the folder named "public" as accessible and seen by all.
app.use(express.static("public"));


app.use("/api", userrouter)
app.use("/user", regRoute)
app.use("/todos", todoRoute)
//app.use("showscase")

app.get("/", (req,res)=>{
    res.render("home.ejs")
})

//app.get("/prod",)

mongoose.connect("mongodb://127.0.0.1/noveltoon")
.then(()=>{console.log("connected to noveltoon")})
.catch(()=>{console.log("Not connected to noveltoon")})





app.listen(5000)

