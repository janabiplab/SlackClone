import React from 'react'
import styled from "styled-components"
import { format, isToday, isYesterday } from 'date-fns';
import { auth } from "../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";


function Message({key,message,timestamp,userName,userImage,messageId,deleteMessage}) {
  const [user]=useAuthState(auth)
  const getFormattedTime = (timestamp) => {
    if (!timestamp) return "Loading...";
   


    const date = timestamp.toDate(); // Assuming `timestamp` is a Firestore Timestamp

    if (isToday(date)) {
      return format(date, "hh:mm a"); // Format for today: 10:00 AM
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "dd/MM/yyyy"); 
    }
  };
 


  return (
    <MessageContainer>
        <img src={userImage} alt=" userImage"/>
        <MessageInfo>
        <h4>
           {user.displayName}{' '}
           <span>{getFormattedTime(timestamp)}</span>
           
        </h4>
        <p>{message}</p>
      
        <button onClick={() => deleteMessage(messageId)}>Delete</button>
      
        </MessageInfo>
        
      
    </MessageContainer>
  )
}

export default Message

const MessageContainer=styled.div`
display:flex;
align-items:flex-start;
padding:10px;

>img{
  height:50px;
  width:50px;
  margin-top:22px;
  border-radius:8px;
}
     
`;
const MessageInfo=styled.div`
   padding-left:10px;
   >h4>span{
    color:gray;
    font-weight:400;
    font-size:13px;
    margin-left:20px;

   }
   >button{
    margin-right:20px;
    font-size:12px;
    padding:2px;
    border:none;
    cursor:pointer;
    background-color: #3e3e5b;
    outline:none;
    font-weight:bold;
    color:white;
   }
   >button:hover{
    background-color:red;
    color:white;
   }
`;