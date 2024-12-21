import { request } from '@/utils/request'; // Adjust the path based on your project structure

interface validateResponse {
    success: boolean
    data: object
    message: string
}

// Validate if the restaurant exists (with optional validate query)
export const validateRestaurant = async (restaurantId: string, options = {}) => {
    const url = `/api/restaurants/${restaurantId}?validate=true`;
    const response = await request(url, 'GET', null, options) as validateResponse;
    return response.success;
};

// Get restaurant data by restaurantId
export const getRestaurantById = async (restaurantId: string, options = {}) => {
    const url = `/api/restaurants/${restaurantId}`;
    return request(url, 'GET', null, options);
};

// Get menu data by restaurantId
export const getMenuByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `/api/menus?restaurantId=${restaurantId}`;
    return request(url, 'GET', null, options);
};

// Get waiters data by restaurantId
export const getWaitersByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `/api/waiters?restaurantId=${restaurantId}`;
    const resposne = await request(url, 'GET', null, options) as validateResponse;
    if (resposne.success) {
        return resposne.data
    }
};
