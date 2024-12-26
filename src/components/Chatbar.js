import styled from "styled-components"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector} from "react-redux";
import {selectRoomId} from "../features/appSlice"
import ChatInput from "./ChatInput";
import {db} from "../firebase";
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import {  doc, collection, query, orderBy } from 'firebase/firestore';
import Message from "./Message";
import { useEffect, useRef} from "react";
import {   deleteDoc} from 'firebase/firestore';





export default function Chatbar(){
    const roomId=useSelector(selectRoomId)
    const chatRef=useRef(null)
    

    // Fetch room details
     const [roomDetails] = useDocument(
    roomId && doc(db, "rooms", roomId)
    );
  
    //Fetch room messages
    const [roomMessage,loading] = useCollection(
    roomId && query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    )
    );   
    // use effect for when newmessage type it will be atomatically upper some space

    useEffect(() => {
        chatRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [roomId, loading]);

    // this function works for delete the message

    const deleteMessage = async (messageId) => {
        const confirmation = window.confirm("Are you sure you want to delete this message?");
        if (confirmation) {
          try {
            // Firestore Deletion
            await deleteDoc(doc(db, 'rooms', roomId, 'messages', messageId));
            console.log("Message deleted successfully");
            
          } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message.');
          }
        }
      };
    const deleteChannel = async () => {
        if (!roomId) {
          alert("No channel selected");
          return;
        }
    
        const confirmation = window.confirm(
          "Are you sure want to delete the Channel"
        );
        if (confirmation) {
            try {
              await deleteDoc(doc(db, "rooms", roomId));
              alert("Channel deleted successfully.");
            } catch (error) {

              alert("Failed to delete the channel.");
            }
          }
        };      
    if (!roomId || !roomDetails?.exists()) {
            return (
              <ChatbarContainer>
                
              </ChatbarContainer>
            );
          }

    
   
    
    return(
        <ChatbarContainer>
            {/* show the chat bar only when roomMessage and roomDetails present */}
            {roomDetails && roomMessage &&(
                  <>
                  <Head>
                      <LeftHeader>
                      <h4>
                          {/* This will show the Channel name of the chat left upper portion */}
                          <strong># {roomDetails?.data().name}</strong>
                      </h4>
                      <StarBorderIcon/>
                      </LeftHeader>
                      <RightHeader>
                          <button onClick={deleteChannel}>Delete Channel</button>
                          <InfoOutlinedIcon/> 
                          <h3>
                              
                              Details
                          </h3>
                      </RightHeader>
                  </Head>
                  <ChatMessage>
                    {/* if the message is present then it takes variable and pass props like ky,message,timestamp,userName,userImage,messageId,deleteMessage into Message component*/}
                   {roomMessage?.docs.map(doc =>{
                      const {message,timestamp,user,userImage}=doc.data();
                      return(
                          <Message
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            userName={user}
                            userImage={userImage} 
                            messageId={doc.id}
                            deleteMessage={deleteMessage}

                          />
                      )
                   })} 
                   {/* This div will create empty div for create chat for lower portion */}
                   <div ref={chatRef} />
                  </ChatMessage>
      
                  <ChatInput 
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}  
                        channelId={roomId}
                     />
                  </>   
            )}
          
        </ChatbarContainer>
    )
}

const ChatbarContainer=styled.div`
   flex:9;
   margin-top:50px;
   margin-left:20px;
   overflow-y:auto;
  
`;
const Head=styled.div`
   display:flex;
   margin-top:5px;
   justify-content:space-between;
   border-bottom:2px solid #cccc99;


`;
const LeftHeader=styled.div`

    display:flex;
    align-items:center;
    >h4{
        font-size:16px;
        color:#4d4d4d;
    }
    >.MuiSvgIcon-root{
        margin-left:5px;
        font-size:18px;
    }



`;
const RightHeader=styled.div`
  display:flex;
  align-items:center;
  margin-right:20px;
  >h3{
    font-size:16px;
    color:#4d4d4d;
    font-weight:500;
  }
  >.MuiSvgIcon-root{
    font-size:16px;
    margin-right:6px;
  }
  >button{
    margin-right:20px;
    font-size:14px;
    padding:2px;
    border:none;
    cursor:pointer;
    background-color:#3e3e5b;
    outline:none;
    font-weight:bold;
    color:white;

  }
  >button:hover{
    color:white;
    background-color:#ff4d4d;


  }
  

`;
const ChatMessage=styled.div`
    color:black;
    margin-bottom:100px;

`