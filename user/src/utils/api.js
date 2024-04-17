const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Fetch
export const getUsers = async (page, limit) => {
  const response = await fetch(`${BASE_URL}/users?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Create
export const addUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  const data = await response.json();
  return data;
};

// Edit
export const editUser = async (userId, userData) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to edit user');
    }
    const data = await response.json()
    return data;
};

// Delete
export const deleteUser = async (userId) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    console.log("deleted")
};
