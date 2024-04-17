import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button, Spinner } from '@chakra-ui/react';
import { addUser, editUser } from '../utils/api';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [firstName, setFirstName] = useState(user ? user.name.split(" ")[0] : '');
  const [lastName, setLastName] = useState(user ? user.name.split(" ")[1] : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [department, setDepartment] = useState(user ? user.company.name : '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true); 
    const userData = {
      name:firstName+" "+lastName,
      email,
      company:{name:department},
    };
    console.log(userData)
    try {
      if (user) {
          await onSubmit(user.id, userData);
          // await editUser(user.id, userData);
        } else {
          await onSubmit(userData);
        // await addUser(userData);
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? 'Edit User' : 'Add User'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" mb={2} />
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" mb={2} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" mb={2} />
          <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" mb={2} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Save'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
