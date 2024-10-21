import axios from 'axios';

// Login API
export const departmentLoginApi = async (inputData) => {
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/department_login',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: inputData,
        };

        // Await the response and return the data directly
        let response = await axios(options);
        return response; // Return response data directly

    } catch (error) {
        // Return a structured error response
        console.error("Login API Error:", error.response?.data || error.message);
        return { error: true, message: error.response?.data?.message || "An error occurred during login." };
    }
};

// Signup API
export const departmentSignupApi = async (inputData) => {
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/create_department', // Ensure this is the correct signup endpoint
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: inputData,
        };

        // Await the response and return the data directly
        let response = await axios(options);
        return response; // Return response data directly
    

    } catch (error) {
        // Return a structured error response
        console.error("Signup API Error:", error.response?.data || error.message);
        return { error: true, message: error.response?.data?.message || "An error occurred during signup." };
    }
};
