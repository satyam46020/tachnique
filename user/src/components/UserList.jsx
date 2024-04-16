import React, { useState, useEffect } from 'react';
import { Spinner, Text, Flex } from '@chakra-ui/react';
import UserListItem from './UserListItem';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await res.json();
        setUsers(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Spinner />;


  return (
    <Flex spacing={4} align="stretch">
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))
      )}
    </Flex>
  );
};

export default UserList;
