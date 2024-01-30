import React from 'react'
import { IconButton, useDisclosure,Image,Text } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
// import { ChatState } from './context/Chatprovider';

const Profile = ({children=true}) => {
  const user =JSON.parse(localStorage.getItem("id"));
  console.log(user + "profile");
    const {isOpen,onOpen,onClose} = useDisclosure();
  return (
    <div>
    {
     children ? (<span onClick={onOpen}>{children}</span>)
:(
    <IconButton
    display={{base:"flex"}}
    icon={<ViewIcon/>} 
    onClick={onOpen}
    ></IconButton>
)}


 <Modal size="lg"

 iscentered
 isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
        height='auto'
        width={{base:"290px" , md:'400px'}}
        >
        
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          >
           <Image
           borderRadius="full"
           boxSize="150px"
           src={!user.pic ? "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg" : user.pic}
           alt={user.name}
           >
           </Image>
          </ModalBody>
      
          <ModalHeader>
            <Text
           fontSize={{base:"28px",md:"30px"}}
          fontFamily={ `"Lucida Console","Courier New",monospace`}>Name : {user.name}
           </Text>

           <Text
           fontSize={{base:"28px",md:"30px"}}
          fontFamily={ `"Lucida Console","Courier New",monospace`}>Email:{user.email}
           </Text>
              
          </ModalHeader>
          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>

   </div>


  )
}

export default Profile
