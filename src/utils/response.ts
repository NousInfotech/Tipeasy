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
 * @param {unknown} [data=null] - Optional data to include in the response.
 * @returns {SuccessResponse} - The formatted success response.
 */
export const successResponse = (
  message: string,
  data: unknown = null
): SuccessResponse => ({
  success: true,
  message,
  data,
});

/**
 * Generate an error response object.
 * @param {unknown} error - The error object to format.
 * @returns {ErrorResponse} - The formatted error response.
 */
export const errorResponse = (error: unknown): ErrorResponse => {
  const formattedError = formatError(error);

  // Check for additional details field in the error object
  let details: unknown;
  if (typeof error === "object" && error !== null && "details" in error) {
    details = (error as { details?: unknown }).details;
  }

  return details
    ? { ...formattedError, details }
    : formattedError;
};
