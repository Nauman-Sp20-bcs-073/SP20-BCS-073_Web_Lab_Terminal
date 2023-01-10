import React, { useEffect, useState } from "react";
import "./viewCSS/product.css"
import { Button } from "@mui/material";
import {Box} from "@mui/material";
import axios from "axios"
import serverLink from "../../serverLinking"

import DeleteIcon from '@mui/icons-material/Delete';

import NotepadImage from "../../assets/notepad.png"
import EditIcon from '@mui/icons-material/Edit';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

//import Loader from "./Loader.jsx";

import {Rings} from "react-loader-spinner"




const TodoRenderer = () => {

    const [novels, setNovels] = useState([])

    useEffect(()=>{
        axios.get(`${serverLink}/todos`).then((res)=>{
        setNovels(res.data)
        console.log(res.data)
        }).catch((e)=>{
            console.log("An error occured" + e);
        })
    },[])

    async function deleteTodo(id){
        axios.delete(`${serverLink}/todos/${id}`).then((res)=>{
            console.log(res.data)
            window.location.reload()
            }).catch((e)=>{
                console.log("An error occured" + e);
            })
        
    }


                               

    
function NovelDisplay (props) {
    
        return (
            <>
    <div>
    
    <Box className="homeNovelBox">
      <div className="homeNovelBoxImageDiv">
      <img src={NotepadImage} />
      </div>
      <div className="homeNovelBoxInfoDiv">
        <p style={{fontSize:"larger", fontWeight:"bold"}}><span>{props.item.name}</span></p>
        <p className="homeNovelBoxInfo"><span>{props.item.description.substring(0,210)+"..."}</span></p>
        <div style={{display:"flex", margin:"0.5%"}}>  


 




     </div>
     <span><p><b>Due date: </b> {props.item.dueDate}  </p></span>
      </div>


   

      <div>

      <Button value={props.item._id} onClick={(e)=> deleteTodo(e.target.value)}> <DeleteIcon />Delete</Button>  
      <Button value={props.item._id}> <EditIcon/> Edit</Button>

      </div>

    </Box>

    
      
    </div>




                
            </>
        )
}



    while (novels.length == 0) return(<div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"20%" }}>
<Rings
  height="150"
  width="150"
  radius="10"

/>
    </div>)

    return (
        <>
        <h2 style={{margin:"1%", marginTop:"1%", fontFamily:"Lucida", fontWeight:"bold"}}>Popular Novels</h2>
        
        <Box className="NovelBoxMain">
        
        { novels.map((novels)=>{
            return (<Box className="innerNovelBox"> <NovelDisplay item={novels}/> </Box>)})}
        
        </Box>
      
        </>
        )
        

}
 
export default TodoRenderer;

// div detection = border:"2px", borderColor:"red", borderStyle:"dotted", 


/**
 * 
 * import {Audio} from "react-loader-spinner"
 * 
 * <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
 */

// axios.post(`http://localhost:4000/add-to-cart/${prodID}`, {prodID}).then(()=> alert("Item Added to cart")).catch((error)=> console.log("Item was NOT added to cart " + error))
