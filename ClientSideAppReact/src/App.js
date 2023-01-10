import "./App.css";

import { Link, Route, Routes } from "react-router-dom";

import { useState } from "react";

import Navbar from "./components/views/NavBarBootstrap"
import HomePage from "./components/views/HomePage";
import ContactUs from "./components/views/ContactUs";
import TodoRenderer from "./components/views/Todos"
import Register from "./components/views/Register"
import Login from "./components/views/Login"
import Profile from "./components/views/Profile"

//import Footer from "./components/views/Footer"

import Footer from "./components/views/FooterBeta"



function App() {

  return (
    <>
  {Navbar()}
   
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<ContactUs />} />
        <Route path="/todos" element={<TodoRenderer />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />

    </Routes>


    <div style={{marginTop:"10%"}}> {Footer()}</div>
  
   
    </>
    
  );
}

export default App;
