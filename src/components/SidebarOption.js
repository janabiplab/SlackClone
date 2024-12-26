import React from 'react'
import styled from "styled-components"

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';


function SidebarOption({Icon,title,addChannelOption,id}) {
    const dispatch=useDispatch();
  
    const addChannel = async () => {
        const channelName = prompt("Please enter the channel name");
        if (channelName) {
            try {
                await addDoc(collection(db, 'rooms'), {
                    name:channelName,
                });
                
            } catch (error) {
                console.error("Error adding channel: ", error);
            }
        }
    };
     
   const selectChannel=()=>{
    if (id){
        dispatch(enterRoom({
            roomId:id,
        }))
    }
   } 
  return (
    <SidebarOptionContainer
      addChannelOption={true}
      onClick={addChannelOption ? addChannel : selectChannel }
    >
        {Icon && <Icon fontSize="small" style={{padding:10}}/>}
        {Icon ? (
            <h3>{title}</h3>
        ):(
            <SidebarOptionChanel>
                <span>#</span>{title}
            </SidebarOptionChanel>
        )}
       

    </SidebarOptionContainer>
  )
}

export default SidebarOption

const SidebarOptionContainer=styled.div`
display:flex;
align-items:center;
font-size:10px;
cursor:pointer;
:hover{
    background-color:#474743;
    border-radius:4px;
    margin-right:5px;

}   
>h3{
    font-weight:500;

}
>h3>span{
    padding:10px;
    
}
       
`;
const SidebarOptionChanel=styled.div`
        padding:0;
        font-size:14px;
        margin-left:15px;
        margin-bottom:3px;
        >span{
            margin-right:3px;
        }

`;
