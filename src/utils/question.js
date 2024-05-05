// api/user.js
import axios from '../utils/api';

export const postQuestion = async (session, lang,text,question,authToken,answer) => {
  try {
    const response = await axios.post('/quizzes/question/', {  lang, text,session,question,answer },{
        headers: {
            Authorization: `Token ${authToken}`,
          },
     });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getQuestion = async (session, authToken) => {
  try {
    const response = await axios.get('/quizzes/question/', {
      params: { 'session': session }, // Pass session as a query parameter
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteQuestion = async (questionId, authToken) => {
    try {
      const response = await axios.delete('/quizzes/question/',{questionId}, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };