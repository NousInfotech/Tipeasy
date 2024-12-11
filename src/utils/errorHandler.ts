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
 * @param {unknown} error - The error object to format.
 * @returns {FormattedError} - The formatted error object.
 */
export const formatError = (error: unknown): FormattedError => {
  if (error instanceof Error) {
    // Use ERROR_CODES and ERROR_MESSAGES to provide default error code and message
    const message = ERROR_MESSAGES[error.message as keyof typeof ERROR_MESSAGES] || error.message || "Something went wrong";
    const code = ERROR_CODES[error.message as keyof typeof ERROR_CODES] || "UNKNOWN_ERROR";
    const status = (error as CustomError).status || 500; // Default to 500 if no status is provided

    return {
      success: false,
      message,
      code,
      status,
    };
  }

  // If the error is not an instance of Error, return a generic error
  return {
    success: false,
    message: "An unknown error occurred",
    code: "UNKNOWN_ERROR",
    status: 500,
  };
};

// Example: Logging error (can be extended for different environments)
export const logError = (error: CustomError) => {
  const code = error.code || "SERVER_ERROR";
  const message = error.message || "No error message provided";
  console.error(`[ERROR] ${code}:`, message);
};
