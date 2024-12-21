// utils/checkResponse.ts
import { validateResponse } from "@/types/schematypes";

// Utility function to check if the response is successful
export const checkResponse = (response: validateResponse) => {
    if (response.success) {
        return response.data; // Return the data if the response was successful
    } else {
        throw new Error(response.message || 'Request failed');
    }
};
