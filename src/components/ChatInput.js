import React,{useRef} from 'react'
import styled from "styled-components"
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; 


function ChatInput({channelName,channelId,chatRef}) {
    const [inputMessage,setInputMessage]=useState("")
    const inputRef = useRef();
    const [user]=useAuthState(auth)
   


    const sendMessage = async (e) => {
      e.preventDefault(); // Prevent form submission from refreshing the page
     // If the user tipe message then set variable message ,timestamp,user-name,userImage
      if (inputMessage.trim() && channelId) {
          try {
              await addDoc(
                  collection(db, 'rooms', channelId, 'messages'),
                  {
                      message: inputMessage,
                      timestamp: serverTimestamp(),
                      user_name:user.displayName,
                      userImage:user.photoURL,               
                  }
              );
              chatRef?.current?.scrollIntoView({ behavior: 'smooth' });
              setInputMessage(""); // Clear the input field after sending the message
          } catch (error) {
              console.error("Error sending message: ", error);
          }
      }
  }
 
  
    
  return (
    <ChatInputContainer>
            <form onSubmit={sendMessage}>
                <input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message #${channelName || "channel"}`}
                />
                <button type="submit" hidden>
                    SEND
                </button>
            </form>
    </ChatInputContainer>

  )
}

export default ChatInput

const ChatInputContainer=styled.div`
   border-radius:20px;
   >form{
    position:relative;
    display:flex;
    justify-content:center;
   }
   > form > input{
       position:fixed;
       bottom:30px;
       width:60%;
       border:1.5px solid gray;
       border-radius:3px;
       padding:10px;
       outline:none;
   }
   >form >button{
    display:none !important;
   }
`;