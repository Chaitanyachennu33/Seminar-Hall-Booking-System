import axios from 'axios';

export const clearHallApi = async (inputData) => {
  try {
    const options = {
        method: 'POST',
        url: 'http://localhost:8000/api/hall/clear_hall',
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
        data:inputData
    };


    let response = await axios(options);
    return response.data


  } catch (error) {
    console.error(error.response.data); 
  }
};