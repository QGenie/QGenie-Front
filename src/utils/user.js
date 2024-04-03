// api/user.js
import axios from '../utils/api';

export const login = async (email, password) => {
  try {
    console.log(email);
    const response = await axios.post('/users/login/', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post('/users/signup/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const verifyemail = async (email,code) => {
    try {
      const response = await axios.post('/users/verify_email/', {email, code});
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

export const getUser = async (userId, authToken) => {
  try {
    const response = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (userId, userData, authToken) => {
  try {
    const response = await axios.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
