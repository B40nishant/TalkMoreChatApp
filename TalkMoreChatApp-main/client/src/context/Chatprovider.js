import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [fetchAgain , setfetchAgain] = useState(true); 
  const [selectedChat, setSelectedChat] = useState();
  const [User, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  return (
    <ChatContext.Provider
      value={{
        fetchAgain,
        setfetchAgain,
        selectedChat,
        setSelectedChat,
        User,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
