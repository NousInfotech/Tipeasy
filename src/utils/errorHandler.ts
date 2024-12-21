import { ERROR_CODES, ERROR_MESSAGES } from "./constants";
import { MongoError } from "mongodb"; // For MongoDB-specific error handling
import { FormattedError, CustomError } from "@/types";



/**
 * Format an error for the error response.
 * @param {unknown} error - The error object to format.
 * @returns {FormattedError} - The formatted error object.
 */
export const formatError = (error: unknown): FormattedError => {
  if (error instanceof Error) {
    const customError = error as CustomError;

    // Check for Mongoose Validation Error
    if (customError.name === "ValidationError") {
      const validationErrors = Object.values((customError as any).errors).map((err: any) => err.message);
      return {
        success: false,
        message: validationErrors.join(", "),
        code: "VALIDATION_ERROR",
        status: 400,
      };
    }

    // Handle MongoDB Duplicate Key Error
    if ((error as MongoError).code === 11000) {
      const key = Object.keys((error as any).keyValue)[0];
      return {
        success: false,
        message: `The ${key} already exists.`,
        code: "DUPLICATE_KEY_ERROR",
        status: 409,
      };
    }

    // General error handling using predefined constants
    const message = ERROR_MESSAGES[customError.message as keyof typeof ERROR_MESSAGES] || customError.message || "Something went wrong";
    const code = ERROR_CODES[customError.message as keyof typeof ERROR_CODES] || "UNKNOWN_ERROR";
    const status = customError.status || 500;

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

/**
 * Log error for debugging purposes.
 * @param {CustomError} error - The error object to log.
 */
export const logError = (error: CustomError) => {
  const code = error.code || "SERVER_ERROR";
  const message = error.message || "No error message provided";
  console.error(`[ERROR] ${code}:`, message);
};
