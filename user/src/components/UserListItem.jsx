import React, { useState } from 'react';
import { Box, Text, IconButton, Flex } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { deleteUser } from '../utils/api';
import UserModal from './UserModal';

const UserListItem = ({ user }) => {

    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        try {
        const response = await deleteUser(user.id)
        } catch (error) {
        console.error('Error deleting user:', error.message);
        }
    };

    const handleEdit = () =>{
        setIsEditing(true);
    }

  return (
    <Box p={4} borderRadius="md" boxShadow="md" _hover={{ shadow: 'lg', cursor: 'pointer', bg: 'gray.200' }}>
      <Flex direction="column" align={'center'}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>ID: {user.id}</Text>
        <Text fontWeight="bold" fontSize="lg" mb={2}>Name: {user.name}</Text>
        <Text fontSize="xl" mb={2}>Email: {user.email}</Text>
        <Text fontSize="md" mb={4}>Website: {user.website}</Text>
        <Flex justify="space-around" w="100%">
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            aria-label="Edit"
            onClick={handleEdit}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            aria-label="Delete"
            onClick={handleDelete}
          />
        </Flex>
      </Flex>
      {isEditing && <UserModal user={user} onClose={() => setIsEditing(false)} />}
    </Box>
  );
};

export default UserListItem;
