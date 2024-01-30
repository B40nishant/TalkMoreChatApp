import { Box } from '@chakra-ui/react';
import React   from 'react'
// import { ChatState } from './context/Chatprovider'
import SideDrawer from './SideDrawer';
import MyChats from './MyChats'; 
import ChatBox from './ChatBox'
import { useNavigate } from 'react-router-dom';



const Chatpg = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('token'); 
  return (
    !token ? navigate('/'): 
    (<div style={{width:'100%'}}>
    <SideDrawer/>
     <Box
     display='flex'
     justifyContent='spcae-between'
     width='100%'
     height='91.5vh'
     >
       <MyChats   />
      <ChatBox  />
     </Box>
    </div>)
  )
}

export default Chatpg
