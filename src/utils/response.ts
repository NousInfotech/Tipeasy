import { formatError } from "./errorHandler";

interface SuccessResponse {
  success: true;
  message: string;
  data?: unknown;
}

interface ErrorResponse {
  success: false;
  message: string;
  code: string;
  status: number;
  details?: unknown; // Optional field for additional error context
}

/**
 * Generate a success response object.
 * @param {string} message - A message describing the success.
 * @param {any} [data=null] - Optional data to include in the response.
 * @returns {SuccessResponse} - The formatted success response.
 */
export const successResponse = (message: string, data: unknown = null): SuccessResponse => ({
  success: true,
  message,
  data,
});

/**
 * Generate an error response object.
 * @param {any} error - The error object to format.
 * @returns {ErrorResponse} - The formatted error response.
 */
export const errorResponse = (error: unknown): ErrorResponse => {
  const formattedError = formatError(error);

  // Include additional details if available (e.g., validation errors)
  const details = (error as any)?.details;

  return {
    ...formattedError,
    ...(details && { details }), // Conditionally add details
  };
};
