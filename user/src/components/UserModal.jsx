import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from '@chakra-ui/react';
import { editUser } from '../utils/api';

const UserModal = ({ user, onClose }) => {
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedWebsite, setEditedWebsite] = useState(user.website);

  const handleSaveEdit = async () => {
    try {
      const response = await editUser();
        onClose();
    } catch (error) {
      console.error('Error editing user:', error.message);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} placeholder="Name" mb={2} />
          <Input value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} placeholder="Email" mb={2} />
          <Input value={editedWebsite} onChange={(e) => setEditedWebsite(e.target.value)} placeholder="Website" mb={2} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
