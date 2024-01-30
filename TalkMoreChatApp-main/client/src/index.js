import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import  {BrowserRouter as Router} from 'react-router-dom';
import Chatprovider from './context/Chatprovider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
      <Chatprovider>
    <ChakraProvider>
     <App />
    </ChakraProvider>
  </Chatprovider>
    </Router>
);

