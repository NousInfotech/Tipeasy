import { IOrder, validateResponse } from "@/types/schematypes"
import { checkResponse } from "@/utils/checkResponse"
import { get, post } from "@/utils/request"



export const createMenuOrder = async (data: Partial<IOrder>, options = {}) => {
    const url = `/api/orders`
    const response = await post(url, data, options) as validateResponse;
    return checkResponse(response);
}
export const getMenuOrders = async (options = {}) => {
    const url = `/api/orders`
    const response = await get(url, options) as validateResponse;
    return checkResponse(response);
}
export const getMenuOrdersByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `/api/orders?restaurantId=${restaurantId}`
    const response = await get(url, options) as validateResponse;
    return checkResponse(response);
}
export const getMenuOrdersById = async (orderId: string, options = {}) => {
    const url = `/api/orders?orderId=${orderId}`
    const response = await get(url, options) as validateResponse;
    return checkResponse(response);
}
