import axios from 'axios';

export const changeBookingRequestApi = async (inputData) => {
  console.log('Input Data:', inputData); // Log the input data for debugging

  try {
    const options = {
      method: 'POST',
      url: 'http://localhost:8000/api/booking/change_booking_request',
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
      data: inputData,
    };

    const response = await axios(options);
    return response;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Server Response Error:', error.response.data);
    } else if (error.request) {
      // No response was received from the server
      console.error('No Response Error:', error.request);
    } else {
      // Error occurred while setting up the request
      console.error('Request Setup Error:', error.message);
    }
  }
};
