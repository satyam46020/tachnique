import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

const UserListItem = ({ user }) => {
  return (
    <Box justifyContent="space-between" alignItems="center">
      <Text>{user.id}</Text>
      <Text>{user.name.split(" ")[0]}</Text>
      <Text>{user.name.split(" ")[1]}</Text>
      <Text>{user.email}</Text>
      <Text>{user.website}</Text>
      <Button colorScheme="red">Delete</Button>
    </Box>
  );
};

export default UserListItem;
