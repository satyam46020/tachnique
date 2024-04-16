import React, { useState, useEffect } from 'react';
import { Spinner, Text, Grid, useToast, Button } from '@chakra-ui/react';
import UserListItem from './UserListItem';
import { getUsers, addUser, editUser, deleteUser } from '../utils/api';
import UserModal from './UserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to fetch data from server',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [toast]);

  const handleAddUser = async (userData) => {
    try {
      await addUser(userData);
      fetchUsers();
      toast({
        title: 'Success',
        description: 'User added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      setError(error.message);
      toast({
        title: 'Error',
        description: 'Failed to add user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditUser = async (userData) => {
    try {
      await editUser(selectedUser.id, userData);
      fetchUsers();
      toast({
        title: 'Success',
        description: 'User edited successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      closeModal();
    } catch (error) {
      setError(error.message);
      toast({
        title: 'Error',
        description: 'Failed to edit user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
      toast({
        title: 'Success',
        description: 'User deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setError(error.message);
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Text align={'center'} fontSize="xxx-large" pt={5}>User Management Dashboard</Text>
      <Button colorScheme="green" onClick={() => openModal()} mt={10} ml={"45%"}>Add User</Button>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4} m={20}>
        {users.length === 0 ? (
          <Text>No users found.</Text>
        ) : (
          users.map((user) => (
            <UserListItem key={user.id} user={user} onEdit={() => openModal(user)} onDelete={() => handleDeleteUser(user.id)} />
          ))
        )}
      </Grid>
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UserList;
