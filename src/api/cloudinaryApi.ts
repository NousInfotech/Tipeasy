import { validateResponse } from "@/types/schematypes";
import { checkResponse } from "@/utils/checkResponse";
import { del } from "@/utils/request";

export const deleteCloudinaryImageApi = async (imageURL: string, options = {}) => {
    const url = `/api/cloudinary`;
    const response = await del(url, { cloudinaryImageURL: imageURL }, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};