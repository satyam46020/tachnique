import React, { useState, useEffect } from 'react';
import { Spinner, Text, Grid, useToast } from '@chakra-ui/react';
import UserListItem from './UserListItem';
import { getUsers } from '../utils/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <Spinner />;

  return (
    <>
    <Text align={'center'} fontSize="xxx-large" pt={5}>User Management Dashboard</Text>
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4} m={20}>
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))
      )}
    </Grid>
    </>
  );
};

export default UserList;
