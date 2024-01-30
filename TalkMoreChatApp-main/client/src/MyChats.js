import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { ChatState } from "./context/Chatprovider";
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import GroupChatModal from './GroupChatModal';


 
const MyChats = () => {

const idd = JSON.parse(localStorage.getItem("id"));
    const {selectedChat,setSelectedChat ,chats,setChats,fetchAgain} = ChatState();
    const toast = useToast(); 
    const getSender = (users)=>{
      return users[0]._id === idd._id ? users[1].name :users[0].name;
    }
  useEffect(()=>{
      const fetchChats = async () => {
    try {
      const config = {
        headers: {
         token :localStorage.getItem('token')
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
       toast({
        title: "Error Occured!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  fetchChats();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetchAgain]);




 return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="2.5px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={ `"Lucida Console","Courier New",monospace`}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
          
      >
       Chats
        <GroupChatModal 
        >
          <Button
          display={{ base: selectedChat ? "none" : "flex"}}
            // display="flex"
            fontSize={{ base:"15px", md: "08px", lg: "15px" }}
            rightIcon={<AddIcon />}
          >
            Create Group 
          </Button>

        </GroupChatModal>

      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        marginBottom='20px'
        borderRadius="lg"
        overflowY="scroll"
        background= '#96b2bc'
      >
        {chats ? (
          <Stack overflowY="scroll" height="100%"  >
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#203341;" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {chat.isGroupChat
                    ?  chat.chatName
                     :getSender(chat.users)
                    }
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}

              </Box>
            ))}

        </Stack>
        ) : (
          <ChatLoading />
        )}

    </Box>
      </Box>
      );
};

export default MyChats
