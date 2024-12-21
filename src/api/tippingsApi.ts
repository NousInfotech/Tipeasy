import { ITipping, validateResponse } from "@/types/schematypes";
import { checkResponse } from "@/utils/checkResponse";
import { get, post } from "@/utils/request";

export const payTip = async (tippingData: ITipping, options = {}) => {
    const url = '/api/tippings';
    const response = await post(url, tippingData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

export const getTippingByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `api/tippings?restaurantId=${restaurantId}`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

export const getTippingByWaiterId = async (waiterId: string, options = {}) => {
    const url = `api/tippings?restaurantId=${waiterId}`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

