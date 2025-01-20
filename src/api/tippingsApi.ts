import { validateResponse } from "@/types/schematypes";
import { checkResponse } from "@/utils/checkResponse";
import { get, put, post } from "@/utils/request";
import { RazorpayResponse } from "@/types/schematypes";




export const verifyPayment = async (rpResponse: RazorpayResponse, options = {}) => {
    const url = '/api/tippings/verify';
    const response = await post(url, rpResponse, options) as validateResponse;
    return checkResponse(response);
}

export const updateTipping = async (tippingId: string, updatedData: object, options = {}) => {
    const url = `/api/tippings/${tippingId}`;
    const response = await put(url, updatedData, options) as validateResponse;
    return checkResponse(response)
}

export const getTippingByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `/api/tippings/restaurant/${restaurantId}`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};


export const getTippings = async () => {
    const url = `/api/tippings`;
    const response = await get(url, {}) as validateResponse;
    return checkResponse(response); // Check if successful and return data
}

