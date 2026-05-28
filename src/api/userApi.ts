import axios from "axios";

const BASE_URL = "http://192.168.29.177:3000/api/CRUD"


export const createUser = async (userData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};
