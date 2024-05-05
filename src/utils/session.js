// api/user.js
"use client"
import axiosDjango from '../utils/api';
import axiosFast from '../utils/api';

export const postSession = async (title,authToken) => {
    try {
      const response = await axiosDjango.post('/quizzes/session/', {title}, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // If error.response exists, it means the request was made and the server responded with a status code outside of the range of 2xx
        throw error.response.data;
      } else if (error.request) {
        // If error.request exists, it means the request was made but no response was received
        throw 'No response received from server';
      } else {
        // If error.request is not available, it means something happened in setting up the request that triggered an Error
        throw 'Error setting up the request';
      }
    }
  };


export const getSession = async (authToken) => { 
  try {
    const response = await axiosDjango.get('/quizzes/session/', {  
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteSession = async (sessionId, authToken) => {
    try {
      const response = await axiosDjango.delete('/quizzes/session/',{sessionId}, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };