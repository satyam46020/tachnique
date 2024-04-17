import React from 'react';
import { Box, Text, IconButton, Flex } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const UserListItem = ({ user, onEdit, onDelete }) => {

  return (
    <Box p={4} borderRadius="md" boxShadow="md" _hover={{ shadow: 'lg', cursor: 'pointer', bg: 'gray.200' }}>
      <Flex direction="column" align={'center'}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>ID: {user.id}</Text>
        <Text fontWeight="bold" fontSize="lg" mb={2}>First Name: {user.name.split(" ")[0]}</Text>
        <Text fontWeight="bold" fontSize="lg" mb={2}>Last Name: {user.name.split(" ")[1]}</Text>
        <Text fontSize="md" mb={2}>Email: {user.email}</Text>
        <Text fontSize="md" mb={4}>Department: {user.company.name}</Text>
        <Flex justify="space-around" w="100%">
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            aria-label="Edit"
            onClick={onEdit}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            aria-label="Delete"
            onClick={onDelete}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserListItem;
