import { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

/**
 * A general function for making HTTP requests.
 * @param {string} url - The endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {unknown} [data] - The data to send in the body (for POST, PUT).
 * @param {AxiosRequestConfig} [options] - Optional additional configuration for axios.
 * @returns {Promise<unknown>} - The response data from the API.
 */
export const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: unknown = null,
    options: AxiosRequestConfig = {}
): Promise<unknown> => {
    try {
        // For GET requests, do not include 'data' as it is not needed in the body
        const config: AxiosRequestConfig = {
            ...options,
            method,
            url,
            ...(method !== 'GET' && { data }),  // Only add 'data' if method is not GET
        };

        const response = await axiosInstance(config);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};

/**
 * Perform a GET request.
 * @param {string} url - The URL to send the GET request to.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const get = async (url: string, options: AxiosRequestConfig = {}): Promise<unknown> => {
    return request(url, 'GET', null, options);
};



/**
 * Perform a POST request.
 * @param {string} url - The URL to send the POST request to.
 * @param {unknown} data - The data to send in the POST request body.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const post = async (url: string, data: unknown, options: AxiosRequestConfig = {}): Promise<unknown> => {
    return request(url, 'POST', data, options);
};

/**
 * Perform a PUT request.
 * @param {string} url - The URL to send the PUT request to.
 * @param {unknown} data - The data to send in the PUT request body.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const put = async (url: string, data: unknown, options: AxiosRequestConfig = {}): Promise<unknown> => {
    return request(url, 'PUT', data, options);
};

/**
 * Perform a DELETE request.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<unknown>} - The response data.
 */
export const del = async (url: string, options: AxiosRequestConfig = {}): Promise<unknown> => {
    return request(url, 'DELETE', null, options);
};
