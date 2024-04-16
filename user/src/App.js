import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import Home from './pages/Home';
import UserList from './components/UserList';

function App() {
  return (
    <ChakraProvider>
      {/* <Home /> */}
      <UserList/>
    </ChakraProvider>
  );
}

export default App;
