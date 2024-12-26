import React from 'react'
import styled from "styled-components"

import { auth, provider } from "../firebase"; 
import { signInWithPopup } from "firebase/auth";


function Login() {
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user)
     
      // You can redirect or handle the authenticated user here
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <LoginContainer>
        <LoginInnerContainer>
           <img src="https://avatars.githubusercontent.com/u/6911160?s=280&v=4"  alt=""/>
           <h1>Sign in to the TalkFlow</h1>
           <p>TalkFlow.slack.com</p>
           <button onClick={signIn}>Sign in with google</button>
        </LoginInnerContainer>

    </LoginContainer>
  )
}

export default Login

const LoginContainer=styled.div`
  background-color:#003333;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;


   
`;

const LoginInnerContainer=styled.div`
background-color:white;
text-align:center;
padding:50px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

>img{
    height:80px;
    margin-bottom:10px;
}
>p{
  font-weight:600px;
  color:#1a1a1a;
}
>button{
  margin-top:30px;
  background-color:#800033;
  color:white;
  padding:5px;
  font-weight:400px;
  pointer:cursor;
}
>button:hover{
  background-color:#4dff88;
  color:black;
}
   
`;