import React, { useState, useEffect } from 'react';
import { Spinner, Text, Grid, useToast, Button, Flex } from '@chakra-ui/react';
import UserListItem from './UserListItem';
import { getUsers, addUser, editUser, deleteUser } from '../utils/api';
import UserModal from './UserModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(5); 
    const toast = useToast();
  
    const fetchUsers = async () => {
        try {
          const data = await getUsers(currentPage, limit);
          if (currentPage === 1) {
            setUsers(data); 
          } else {
            setUsers((prevUsers) => [...prevUsers, ...data]);
          }
          setLoading(false);
          const totalCount = await getUsers({ _limit: 1 });
          setTotalPages(Math.ceil(totalCount.length / limit));
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
    }, [currentPage, toast]);

    const handleAddUser = async (userData) => {
        try {
            const data = await addUser(userData);
            await setUsers((prevUsers) => [...prevUsers, data]);
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

    const handleEditUser = async (userId, userData) => {
        try {
            const data = await editUser(userId, userData);
            setUsers((prevUsers) => {
                const updatedUsers = prevUsers.map((user) => {
                    if (user.id === data.id) {
                        return { ...user, ...data };
                    }
                    return user;
                });
                return updatedUsers;
            });
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
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
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

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [totalPages]);

    if (loading) return <Spinner />;

    return (
        <>
            <Text align={'center'} fontSize="xxx-large" pt={5} fontWeight="bold" color="teal.500">User Management Dashboard</Text>
            <Flex justifyContent="center">
                <Button textColor={'teal'} colorScheme="white" onClick={() => openModal()} mt={10} border={"1px solid teal"}>Add User</Button>
            </Flex>
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={5} m={20} justifyContent={'center'}>
                {users.length === 0 ? (
                    <Text>No users found.</Text>
                ) : (
                    users.map((user) => (
                        <UserListItem key={user.id} user={user} onEdit={() => openModal(user)} onDelete={() => handleDeleteUser(user.id)} />
                    ))
                )}
            </Grid>
            <Flex justify="center"mt={-10} mb={5}>
                <Text fontWeight="600" mx={4} pt={2} color={'teal'}>{currentPage} / {totalPages}</Text>
            </Flex>
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
