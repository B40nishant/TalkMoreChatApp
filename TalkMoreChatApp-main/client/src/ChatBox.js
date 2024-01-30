import { Box } from "@chakra-ui/layout";
import "./sign.css";
import SingleChat from "./SingleChat";
import { ChatState } from "./context/Chatprovider";

const ChatBox = () => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat  />
    </Box>
  );
};

export default ChatBox;
