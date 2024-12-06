import { ERROR_CODES, ERROR_MESSAGES } from "./constants";

interface CustomError extends Error {
  status?: number;
  code?: string;
}

// Format error messages for API responses
interface FormattedError {
    message: string;
    code: string;
    status: number;
    success: false;  // success should always be false in errors
  }
  
  /**
   * Format an error for the error response.
   * @param {any} error - The error object to format.
   * @returns {FormattedError} - The formatted error object.
   */
  export const formatError = (error: any): FormattedError => {
    // Assuming the error might have a 'message', 'code', and 'status' properties.
    return {
      success: false,  // success is always false for errors
      message: error.message || "Something went wrong",
      code: error.code || "UNKNOWN_ERROR",
      status: error.status || 500,
    };
  };
  
// Example: Logging error (can be extended for different environments)
export const logError = (error: CustomError) => {
  console.error(`[ERROR] ${error.code || "SERVER_ERROR"}:`, error.message);
};
