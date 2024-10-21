import axios from 'axios';

export const createHallApi = async (inputData) => {
  try {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/api/hall/create_hall',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      data: inputData  // The input data will include name, capacity, status, bookings
    };

    let response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};
