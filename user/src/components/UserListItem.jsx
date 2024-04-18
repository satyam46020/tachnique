import React, { useState } from 'react';
import { Box, Text, IconButton, Flex, Spinner } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const UserListItem = ({ user, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  return (
    <Box p={4} borderRadius="md" boxShadow="2px 2px 20px teal" _hover={{ shadow: '2px 2px 20px red', cursor: 'pointer', bg: 'gray.200' }}>
      <Flex direction="column" align="center">
        <Text fontWeight="bold" fontSize="xl" mb={2} fontFamily="Arial">ID: <Text as="span" fontWeight="normal" color="grey" >{user.id}</Text></Text>
        <Text fontWeight="bold" fontSize="lg" mb={2} fontFamily="Arial">First Name: <Text as="span" fontWeight="normal" color="grey" >{user.name.split(" ")[0]}</Text></Text>
        <Text fontWeight="bold" fontSize="lg" mb={2} fontFamily="Arial">Last Name: <Text as="span" fontWeight="normal" color="grey" >{user.name.split(" ")[1]}</Text></Text>
        <Text fontWeight="bold" fontSize="md" mb={2} fontFamily="Arial">Email: <Text as="span" fontWeight="normal" color="grey" >{user.email}</Text></Text>
        <Text fontWeight="bold" fontSize="md" mb={4} fontFamily="Arial">Department: <Text as="span" fontWeight="normal" color="grey" >{user.company.name}</Text></Text>
        <Flex justify="space-around" w="100%">
          <IconButton
            icon={<EditIcon />}
            colorScheme="blue"
            aria-label="Edit"
            onClick={onEdit}
          />
          <IconButton
            icon={isDeleting ? <Spinner size="sm" /> : <DeleteIcon />}
            colorScheme="red"
            aria-label="Delete"
            onClick={handleDelete}
            disabled={isDeleting}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserListItem;
