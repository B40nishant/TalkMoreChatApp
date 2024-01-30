import { Box,FormControl,Input,Spinner,Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ChatState } from './context/Chatprovider'
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Profile from './Profile';
import Upgradegrpchat from './Upgradegrpchat';
import axios from 'axios';
import ChaTScroll from './ChaTScroll';
import io from "socket.io-client";
import './sign.css'

const ENDPOINT = "/";
var socket, selectedChatCompare;








const SingleChat = () => {
  const idd = JSON.parse(localStorage.getItem("id"));
  const [message,setmessage] = useState([]); 
  const [loading , setloading] = useState(); 
   
    const [socketConnected, setSocketConnected] = useState(false);
  const [newmes, setnewmes] = useState(); 
  const toast = useToast();
  const { selectedChat, setSelectedChat, notification, setNotification,setFetchAgain,fetchAgain } = ChatState();



    const getSender  = ( users) =>{
      return users[0]._id === idd._id? users[1].name : users[0].name;
    }
     const messagesend = async(e) =>{
      if( !newmes) return ;
      if(e.key === "Enter" && newmes ) {
        setnewmes(""); 
        try {
          const conf = {
          headers: {
            "Content-type": "application/json",
            token:localStorage.getItem('token')
          },
          };
      const {data} = await axios.post('/api/message',{
        content:newmes,
        chatId:selectedChat._id
      },
      conf
      );
       socket.emit("new message", data);
    setmessage([...message,data]); 

        } catch (error) {
          console.log(error);
          toast({
            title: "Failed to Send Message!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
        setloading(false);
      }
    }
    const typingg = (e) =>{
       setnewmes(e.target.value)
    }


    const fetchMessages = async() =>{
        if(!selectedChat ) return ; 
        setloading(true); 
        try {
          const conf = {
          headers:{
            token:localStorage.getItem('token')
          },
          };
      const {data} = await axios.get(`/api/message/${selectedChat._id}`,conf);
       console.log(socketConnected+"ignr")
    
      setmessage(data);
   setloading(false); 
    socket.emit("join chat", selectedChat._id);
        } catch (error) {
          console.log(error);
          toast({
        title: "Failed to Load the Messages!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
        }
    }

 useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", idd._id);
    socket.on("connected", () => setSocketConnected(true));

    // eslint-disable-next-line
  }, []);

      useEffect(()=>{
      fetchMessages(); 
      selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedChat])

    useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setmessage([...message, newMessageRecieved]);
      }
    });
  });




  return (
    <>
    {selectedChat ? (
        <>
          <Text
          className='hellowthere'
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
          fontFamily={ `"Lucida Console","Courier New",monospace`}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat()}
            />
            {!selectedChat.isGroupChat ? (
                <>
                  {getSender(selectedChat.users)}
                  <Profile/>
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <Upgradegrpchat
                  fetchMessages={fetchMessages}
                  />
                </>
              )}

          </Text>
           <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            width="100%"
            h ="100%"
            borderRadius="lg"
            overflowY="hidden"
             background= '#203341'
          >
          {loading ? (
            <Spinner
            size='xl'
            w={20}
            h={20}
            alignSelf='center'
            margin='auto'
            />
            ): (
              <div className='messsgg'> <ChaTScroll message ={message}/> </div>
          
          )}

        <FormControl onKeyDown={messagesend} isRequired mt={3}>
           <Input
           backgroundColor={'#FFF'}
           variant="ghost"
           placeholder='Enter a message'
           onChange={typingg}
           value={newmes}
           fontFamily={ `"Lucida Console","Courier New",monospace`}
           />

        </FormControl>
           </Box>
        </>
    ) : (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        >
        <Text
        fontSize="3x1" 
        pb={3}
        fontFamily="Work sans"
        > Click On a User to Start chatting </Text>
        </Box>
    )}
    </>
  )
}

export default SingleChat
