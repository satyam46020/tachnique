import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Spinner,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [firstName, setFirstName] = useState(user ? user.name.split(" ")[0] : '');
  const [lastName, setLastName] = useState(user ? user.name.split(" ")[1] : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [department, setDepartment] = useState(user ? user.company.name : '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!department) {
      errors.department = 'Department is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const userData = {
      name: firstName + " " + lastName,
      email,
      company: { name: department },
    };
    try {
      if (user) {
        await onSubmit(user.id, userData);
      } else {
        await onSubmit(userData);
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
        <ModalHeader fontWeight={"700"} fontSize={30} textColor={'teal'}>{user ? 'Edit User' : 'Add User'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={errors.firstName} mb={4}>
            <FormLabel>
              First Name<Text as="span" color="red"></Text>
            </FormLabel>
            <Input textColor={'teal'} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.lastName} mb={4}>
            <FormLabel>
              Last Name<Text as="span" color="red"></Text>
            </FormLabel>
            <Input textColor={'teal'} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.email} mb={4}>
            <FormLabel>
              Email<Text as="span" color="red"></Text>
            </FormLabel>
            <Input textColor={'teal'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.department} mb={4}>
            <FormLabel>
              Department<Text as="span" color="red"></Text>
            </FormLabel>
            <Input textColor={'teal'} value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
            <FormErrorMessage>{errors.department}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit} isLoading={isLoading}>
            Save
          </Button>
          <Button onClick={onClose} textColor={'teal'}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
