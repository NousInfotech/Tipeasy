import fetchApiInstance from '@/config/fetchInstance.ts';

/**
 * A general function for making HTTP requests using fetch API.
 * @param {string} url - The endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {unknown} [data] - The data to send in the body (for POST, PUT).
 * @param {RequestInit} [options] - Optional additional configuration for fetch API.
 * @returns {Promise<unknown>} - The response data from the API.
 */
export const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: unknown = null,
    options: RequestInit = {}
): Promise<unknown> => {
    try {
        const fetchOptions: RequestInit = {
            method,
            body: method !== 'GET' ? JSON.stringify(data) : undefined,
            ...options, // Pass all options including headers, cache, credentials, etc.
        }

        // Fetch the data using fetchApiInstance
        const response = await fetchApiInstance(url, fetchOptions);

        return response; // Return the API response
    } catch (error) {
        // Handle errors
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred during the request.');
    }
};

/**
 * Perform a GET request.
 * @param {string} url - The URL to send the GET request to.
 * @param {RequestInit} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const get = async (url: string, options: RequestInit = {}): Promise<unknown> => {
    return request(url, 'GET', null, options);
};

/**
 * Perform a POST request.
 * @param {string} url - The URL to send the POST request to.
 * @param {unknown} data - The data to send in the POST request body.
 * @param {RequestInit} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const post = async (url: string, data: unknown, options: RequestInit = {}): Promise<unknown> => {

    const response = await request(url, 'POST', data, options);
    return response;
};

/**
 * Perform a PUT request.
 * @param {string} url - The URL to send the PUT request to.
 * @param {unknown} data - The data to send in the PUT request body.
 * @param {RequestInit} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const put = async (url: string, data: unknown, options: RequestInit = {}): Promise<unknown> => {
    return request(url, 'PUT', data, options);
};

/**
 * Perform a DELETE request.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {RequestInit} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const del = async (url: string, data: unknown, options: RequestInit = {}): Promise<unknown> => {
    return request(url, 'DELETE', data, options);
};
