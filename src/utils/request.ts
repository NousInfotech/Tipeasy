import { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

/**
 * A general function for making HTTP requests.
 * @param {string} url - The endpoint URL.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {any} [data] - The data to send in the body (for POST, PUT).
 * @param {AxiosRequestConfig} [options] - Optional additional configuration for axios.
 * @returns {Promise<any>} - The response data from the API.
 */
export const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: unknown = null,
    options: AxiosRequestConfig = {}
): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            ...options,
            method,
            url,
            data,
        };

        const response = await axiosInstance(config);
        return response.data;
    } catch (error: unknown) {
        throw new Error(error.message);
    }
};

/**
 * Perform a GET request.
 * @param {string} url - The URL to send the GET request to.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<any>} - The response data.
 */
export const get = async (url: string, options: AxiosRequestConfig = {}): Promise<any> => {
    return request(url, 'GET', null, options);
};

/**
 * Perform a POST request.
 * @param {string} url - The URL to send the POST request to.
 * @param {any} data - The data to send in the POST request body.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<any>} - The response data.
 */
export const post = async (url: string, data: unknown, options: AxiosRequestConfig = {}): Promise<any> => {
    return request(url, 'POST', data, options);
};

/**
 * Perform a PUT request.
 * @param {string} url - The URL to send the PUT request to.
 * @param {any} data - The data to send in the PUT request body.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<any>} - The response data.
 */
export const put = async (url: string, data: unknown, options: AxiosRequestConfig = {}): Promise<any> => {
    return request(url, 'PUT', data, options);
};

/**
 * Perform a DELETE request.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {AxiosRequestConfig} [options] - Optional additional configuration.
 * @returns {Promise<any>} - The response data.
 */
export const del = async (url: string, options: AxiosRequestConfig = {}): Promise<any> => {
    return request(url, 'DELETE', null, options);
};
