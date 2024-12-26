import styled from "styled-components"
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SidebarOption from "./SidebarOption";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import {useCollection} from  "react-firebase-hooks/firestore"
import { db } from "../firebase";
import { collection } from 'firebase/firestore';
import { auth } from "../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";






export default function Sidebar(){
 
  const [user]=useAuthState(auth)
  const [channels] = useCollection(collection(db, "rooms"));
 

 
    
    return(
        <SidebarContainer >
           
            <SidebarHeadar>
                <SidebarInfo>
                 <h2>
                 TalkFlow
                 </h2>
                 <h3>
                    <FiberManualRecordIcon />
                    {user.displayName}
                 </h3>
                </SidebarInfo>
                <CreateIcon/>
            </SidebarHeadar>
            <SidebarOption Icon={CommentIcon} title="Threads"/>
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions"/>
            <SidebarOption Icon={DraftsIcon} title="Saved items"/>
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser"/>
            <SidebarOption Icon={PeopleAltIcon} title="People & user group"/>
            <SidebarOption Icon={AppsIcon} title="Apps"/>
            <SidebarOption Icon={FileCopyIcon} title="File browser"/>
            <SidebarOption Icon={ExpandLessIcon} title="Show less"/>
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title="Channels"/>
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channels" />
            {channels?.docs.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}


</SidebarContainer>
        
    )
}

const SidebarContainer=styled.div`
     flex:3;
     background-color:#4A154B;
     color:white;
     max-width:260px;
     margin-top:50px;
     overflow-y:auto;
    >hr{
        border:1px solid #49274b;
    }
   
    
`;
const SidebarHeadar=styled.div`
display:flex;
justify-content:space-between;

>.MuiSvgIcon-root{
    margin-top:10px;
    font-size:15px;
    margin-right:10px;
    padding:8px;
    border-radius:50%;
    background-color:#a69e9d;
    cursor:pointer;

}
     
`;
const SidebarInfo=styled.div`
  margin-left:10px;
  >h2{
    font-size:15px;
    font-weight:800;

  }
  >h3{
    display:flex;
    align-items:center;
    font-size:17px;
    font-size:13px;
    font-weight:400;
  }
  h3>.MuiSvgIcon-root{
    font-size:13px;
    color:green;
    margin-top:2px;
    margin-right:2px;

  }


     
`;






