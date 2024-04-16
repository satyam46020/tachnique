import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from '@chakra-ui/react';
import { addUser, editUser } from '../utils/api';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [website, setWebsite] = useState(user ? user.website : '');

  const handleSubmit = async () => {
    const userData = {
      name,
      email,
      website,
    };
    if (user) {
      await editUser(user.id, userData);
    } else {
      await addUser(userData);
    }
    onSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? 'Edit User' : 'Add User'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" mb={2} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" mb={2} />
          <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" mb={2} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
