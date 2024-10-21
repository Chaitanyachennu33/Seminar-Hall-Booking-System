import axios from 'axios';

// Admin login API
export const adminloginApi = async (inputData) => {
  try {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/api/admin_login',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      data: inputData,
    };

    let response = await axios(options);
    return response;
  } catch (error) {
    console.error(error.response.data); 
  }
};

// Admin signup API
export const adminSignupApi = async (inputData) => {
  try {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/api/create_admin', // Update the URL according to your API
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      data: inputData,
    };

    let response = await axios(options);
    return response;
  } catch (error) {
    console.error(error.response.data); 
  }
};
