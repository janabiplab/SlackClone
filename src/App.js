import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import styled from "styled-components"
import Sidebar from './components/Sidebar';
import Chatbar from './components/Chatbar';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";


function App() {
  const [user,loading]=useAuthState(auth)
  if (loading){
    return(
      <Apploading>
        <img src="https://avatars.githubusercontent.com/u/6911160?s=280&v=4"  alt=""></img>
        <ApploadingContainer>
        <Spinner 
         name="ball-spin-fade-loader"
         color="purple"
         fadeIn="none"
         
         
        />
        </ApploadingContainer>

      </Apploading>
    )
  }
  return (
    <div className="App">
      {!user ?(<Login/>):(
          <Router>
        
          <Header /> 
          <AppBody>
            <Sidebar/>
            <Chatbar/>
          
          </AppBody>
          
          
        </Router>
      )}
     
    </div>
  );
}

export default App;
const AppBody=styled.div`
    display:flex;
    width:100%;
    height:100vh;
   
`;
const Apploading=styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   height:100vh;
   flex-direction:column;
   width:100vw;
   >img{
    width:150px;
    height:150px;
    margin-bottom:20px;
   }


`;

const ApploadingContainer=styled.div`



`;

