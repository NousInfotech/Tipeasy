import { IUser, validateResponse } from "@/types/schematypes";
import { checkResponse } from "@/utils/checkResponse";
import { get, post } from "@/utils/request";

export const createUser = async (userData: IUser, options = {}) => {
    const url = '/api/users';
    const response = await post(url, userData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};


export const getAdminIdByEmail = async (email: string, options = {}) => {
    const url = `/api/users?email=${email}`
    const response = await get(url, options) as validateResponse;
    return checkResponse(response);
}