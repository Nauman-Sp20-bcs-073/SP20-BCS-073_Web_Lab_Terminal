import React from "react";
import loginImg from "../../assets/login.svg"
import userIcon from "../../assets/userIcon.png"
import "./viewCSS/Registeration.css"
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function LoginUser(){
    if (password !== "" && email !== "")
      {
        axios.post('http://localhost:5000/user/login',{password,email}).then((res)=>{
          if(res.data !== false){
            sessionStorage.setItem('token',res.data); //token coming from index.js is fetched and set 
            console.log("Login Successful!")
             //window.location.reload();
            }
            else alert("Login Failed!")

        }).catch((e)=>{
            console.log(e)
        })
      }
      else alert("Password or Email Field Cannot be Left Empty")
  }


    return(
        <>
            
      <div className="base-container" style={{marginTop:"5%"}}>
        <div className="header" style={{fontSize:40, fontFamily:"fantasy", marginBottom:"3%"}}>Already a Todo Keeper? Sign in and Continue!</div>
        <div className="content" style={{}}>
          <div className="image" style={{}}>
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="email" value={email} placeholder="Email" onChange={ (e)=> setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={password} placeholder="Enter Password" onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className="form-group">
          <Button style={{backgroundColor: "rgb(91, 91, 147)",color: "white", width:"14em"}} onClick={()=> LoginUser()}>
            Login
          </Button>
        </div>

          </div>
        </div>

      </div>
    
        </>
    )

}

export default Login