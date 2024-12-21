import { get, post, put, del } from '@/utils/request.ts';  // Adjust the path based on where your current file is located
import { checkResponse } from '@/utils/checkResponse.ts'; // Adjust the path based on where your current file is located
import { IRestaurant, IMenu, IWaiter } from '@/types/schematypes.ts'; // Adjust the path based on where your current file is located
import { validateResponse } from '@/types/schematypes.ts'; // Adjust the path based on where your current file is located


// Validate if the restaurant exists (with optional validate query)
export const validateRestaurant = async (restaurantId: string, options = {}) => {
    const url = `/api/restaurants/${restaurantId}?validate=true`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Get restaurant data by restaurantId
export const getRestaurantById = async (restaurantId: string, options = {}) => {
    const url = `/api/restaurants/${restaurantId}`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Get list of all restaurants
export const getRestaurants = async (options = {}) => {
    const url = '/api/restaurants';
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Create a new restaurant
export const createRestaurant = async (restaurantData: IRestaurant, options = {}) => {
    const url = '/api/restaurants';
    const response = await post(url, restaurantData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};


// Generate Restaurant QR
export const generateRestaurantQr = async (restaurantId: string, options = {}) => {
    const url = '/api/generate-qr';
    const response = await post(url, restaurantId, options) as validateResponse;
    return checkResponse(response)
}

// Update an existing restaurant by restaurantId
export const updateRestaurant = async (restaurantId: string, restaurantData: IRestaurant, options = {}) => {
    const url = `/api/restaurants/${restaurantId}`;
    const response = await put(url, restaurantData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Delete a restaurant by restaurantId
export const deleteRestaurant = async (restaurantId: string, options = {}) => {
    const url = `/api/restaurants/${restaurantId}`;
    const response = await del(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// ** Waiter API Methods **

// Get waiters data by restaurantId
export const getWaitersByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `/api/waiters?restaurantId=${restaurantId}`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Create a new waiter
export const createWaiter = async (waiterData: IWaiter, options = {}) => {
    const url = '/api/waiters';
    const response = await post(url, waiterData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Update an existing waiter by waiterId
export const updateWaiter = async (waiterId: string, waiterData: IWaiter, options = {}) => {
    const url = `/api/waiters/${waiterId}`;
    const response = await put(url, waiterData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Delete a waiter by waiterId
export const deleteWaiter = async (waiterId: string, options = {}) => {
    const url = `/api/waiters/${waiterId}`;
    const response = await del(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// ** Menu API Methods **

// Get menu data by restaurantId
export const getMenuByRestaurantId = async (restaurantId: string, options = {}) => {
    const url = `/api/menus?restaurantId=${restaurantId}`;
    const response = await get(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Create a new menu for a restaurant
export const createMenu = async (menuData: IMenu, options = {}) => {
    const url = '/api/menus';
    const response = await post(url, menuData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Update an existing menu by menuId
export const updateMenu = async (menuId: string, menuData: IMenu, options = {}) => {
    const url = `/api/menus/${menuId}`;
    const response = await put(url, menuData, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};

// Delete a menu by menuId
export const deleteMenu = async (menuId: string, options = {}) => {
    const url = `/api/menus/${menuId}`;
    const response = await del(url, options) as validateResponse;
    return checkResponse(response); // Check if successful and return data
};
