import { formatError } from "./errorHandler";

interface SuccessResponse {
  success: true;
  message: string;
  data?: any;
}

interface ErrorResponse {
  success: false;  // success is always false for errors
  message: string;
  code: string;
  status: number;
}

/**
 * Generate a success response object.
 * @param {string} message - A message describing the success.
 * @param {any} [data=null] - Optional data to include in the response.
 * @returns {SuccessResponse} - The formatted success response.
 */
export const successResponse = (message: string, data: any = null): SuccessResponse => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Generate an error response object.
 * @param {any} error - The error object to format.
 * @returns {ErrorResponse} - The formatted error response.
 */
export const errorResponse = (error: any): ErrorResponse => {
  const formattedError = formatError(error);  // Ensure this returns { message, code, status, success: false }
  return {
    ...formattedError,
  };
};
