import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './userRoutes/userRouter.js';
import Chatrouter from './userRoutes/chatRouter.js'; 
import messageRoute from './userRoutes/messageRoutes.js';
import conndb from './config/dbcn.js';

const app = express(); 
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
conndb();
app.use('/api/chat',Chatrouter);
app.use('/api/user',userRouter);
app.use('/api/message',messageRoute);
import {Server} from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});




const PORT = process.env.PORT || 5000
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
})



const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: PORT,
  },
});



io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (idd) => {
    socket.join(idd);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
