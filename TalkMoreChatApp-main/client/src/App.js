import React  from "react";
// import { Button } from '@chakra-ui/react'
import {Route,Routes} from "react-router-dom";
import Chatpg from "./Chatpg";
import Login from "./Login";
import Register from "./Register";
function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route exact path = '/chat' element={<Chatpg/>}> </Route>
      <Route exact path = '/login' element={<Login/>}> </Route>
      <Route exact path = '/' element={<Register/>}> </Route>
    </Routes>
    </div>
  );
}

export default App;
