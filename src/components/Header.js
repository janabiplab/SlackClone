import styled from "styled-components"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { auth } from "../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";


export default function Header() {
  const [user]=useAuthState(auth)
  
  return (
    <HeaderContainer>
        {/* Hearder Left */}
        <HeaderLeft>
        

       < HeaderAccountCircleIcon onClick={() => auth.signOut()}>
          {user?.photoURL ? (
            <UserImage
              alt={user?.displayName}
              src={user?.photoURL}
            />
          ) : (
            
            <AccountCircleIcon sx={{ fontSize: "2rem" }} />  
          )}
        </HeaderAccountCircleIcon>
      
        <HeaderAccessTimeIcon/>
        </HeaderLeft>
        {/* Hearder Search */}
        <HeaderSearch>
           <HeaderSearchIcon/>
           <input placeholder="search"></input>
        </HeaderSearch>
         {/* Hearder Right */}
        <HeaderRight>
           <HeaderHelpOutlineIcon/>
        </HeaderRight>

        
        
       

    </HeaderContainer>
  )
}
const HeaderHelpOutlineIcon=styled(HelpOutlineIcon)`
   margin:30px;
   cursor:pointer;
`

const HeaderContainer=styled.div`
  display: flex;
  width:100%;
  height:50px;
  align-items: center;
  justify-content: space-between;
  background-color:#4A154B;
  position:fixed;
  color:white;
`
const HeaderLeft=styled.div`
flex:3;
display:flex;
align-items:center;
justify-content:space-between;

 
`;
const HeaderSearch=styled.div`
flex:6;
display:flex;
align-items:center;
width:60%;
justify-content:flex-start;
background-color:transparent;
border:1.5px solid white;
border-radius:4px;
margin-left:50px;
margin-right:50px;
padding:2px;
>input{
    border:none;
    width:60%;
    outline:none;
    text-align:center;
    background-color:transparent;
    color:white;
}

`;
const HeaderSearchIcon=styled(SearchIcon)`
 color:white;
 margin-left:10px;
 margin-right:30px;

`
const HeaderRight=styled.div`
flex:3;
display:flex;
justify-content:flex-end


`;



const HeaderAccessTimeIcon=styled(AccessTimeIcon)`
  color:white;
  margin-right:30px;
  font-size:25px !important;
`
const HeaderAccountCircleIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid gray;
  margin-left:15px;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;



