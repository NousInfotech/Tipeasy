import { IUser, validateResponse } from "@/types/schematypes";
import { checkResponse } from "@/utils/checkResponse";
import { post } from "@/utils/request";

export const createUser = async (userData: IUser, options = {}) => {
    const url = '/api/users';
    const response = await post(url, userData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};