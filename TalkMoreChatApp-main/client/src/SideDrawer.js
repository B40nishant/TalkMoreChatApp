import React, { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {  ChevronDownIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "./context/Chatprovider";
import Profile from "./Profile";
import ChatLoading from "./ChatLoading";
import { useNavigate } from "react-router-dom";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const navigate = useNavigate();
  const [ loading, setloading ] = useState(true);
  const [loadingChat , setloadingChat] = useState(true);
  const [search, setsearch] = useState("");
  const [ searchresult, setsearchresult ] = useState([]);
  const  {isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setSelectedChat ,chats,setChats,} = ChatState();
  const User = JSON.parse(localStorage.getItem("id"));

  const accesChat =async (userId) => {
    try {
      setloadingChat(true); 
       const con= {
      headers: {
        'Content-type':"application/json",
        token:localStorage.getItem('token')
      },
    }
      const { data } = await axios.post(`/api/chat`,{userId},con);
      if(!chats.find((c)=> c._id === data._id )) {setChats([data,...chats]); }
      setSelectedChat(data);
      setloadingChat(false); 
      onClose(); 
        }
        catch (error) {
       console.log(error);
       toast({
        title: "Error Occured!",
        description: "Failed to Load ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
        }
  };





  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

   
    try {
      setloading(true); 
       const con= {
      headers: {
        token:localStorage.getItem('token')
      },
    }
      const { data } = await axios.get(`/api/user/alluser?search=${search}`,con);
      setloading(false);
      setsearchresult(data);
        }
        catch (error) {
          console.log(error);
       toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
        }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate("/");
  };
  return (
    <>


      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        boderWidth="5px"
       
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"> </i>
            <Text display={{ base: "none", md: "flex"}} px={4}>
              Seacrh User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="46" fontFamily={ `"Lucida Console","Courier New",monospace`}>
          Talk-More
        </Text>
        <div>
          <Menu>
          </Menu>
          <Menu>
            <MenuButton as={Button}   backgroundColor= '#FFF' rightIcon={<ChevronDownIcon />}>
              <Avatar  size="sm" width={'53px'}  height={'48px'}cursor="pointer"  name = {User.name}  src = {User.pic} />
            </MenuButton>


            <MenuList >
              <Profile User={User}>
                <MenuItem margin={'-13px -13px -18px 0'}backgroundColor={'white'}>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
            </Menu>

        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBotttomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search By Name"
                mr={2}
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go </Button>
                </Box>
            { loading ? (
              <ChatLoading />
            ) : (
              searchresult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user = {user}
                  handlefunction={() => accesChat(user._id)}
                />
              ))
            )
            }
            {loadingChat && <Spinner ml="auto" display= "flex"/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
