import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "./context/Chatprovider";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const Upgradegrpchat = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat } = ChatState();
  const idd = JSON.parse(localStorage.getItem("id"));


  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
     const con= {
      headers: {
        token:localStorage.getItem('token')
      },
    }

     const { data } = await axios.get(`/api/user/alluser?search=${search}`,con);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error); 
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  const handleRename = async () => {
     if (selectedChat.groupAdmin._id !== idd._id ) {
      toast({
        title: "Only admins can rename !",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }






    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
         token: localStorage.getItem('token')
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setRenameLoading(false);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      setRenameLoading(false);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }


    if (selectedChat.groupAdmin._id !== idd._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true, 
        position: "bottom",
      });
      return;
    }

    

    try {
      setLoading(true);
      const config = {
          headers: {
          token: localStorage.getItem('token')
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      setLoading(false);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    
  };


  const leavegrp = async()=>{
       if (selectedChat.groupAdmin._id === idd._id ) {
      toast({
        title: "You are admin U cant Leave !",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
      onClose();

     try {
      setLoading(true);
      const config = {
          headers: {
          token: localStorage.getItem('token')
        },
      };

      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: idd._id,
        },
        config
      );
      setSelectedChat(data);
      setLoading(false);
      setFetchAgain(!fetchAgain);

    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== idd._id ||  user1._id === idd._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      return;
    }
    try {
      setLoading(true);
      const config = {
          headers: {
          token: localStorage.getItem('token')
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === idd._id ? setSelectedChat() : setSelectedChat(data);
      setLoading(false);
      setFetchAgain(!fetchAgain);
      fetchMessages(); 
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
        width={{base:"88%"}}
        >
          <ModalHeader
            fontSize="35px"
          fontFamily={ `"Lucida Console","Courier New",monospace`}
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin._id}
                  handlefunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.slice(0, 3)
                .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handlefunction={() => handleAddUser(user)}
                />
              ))
            )}

          </ModalBody>
          <ModalFooter>
            <Button onClick={  () => leavegrp(idd,onClose)  }  colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Upgradegrpchat;
