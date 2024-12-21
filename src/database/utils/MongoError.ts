import { MongoError } from "mongodb"; // For handling MongoDB-specific errors
import { formatError } from "@/utils/errorHandler";

interface MongoValidationError extends Error {
  errors: Record<string, { message: string }>;
}

/**
 * Helper function to handle MongoDB validation errors and format them.
 * @param {unknown} error - The caught error.
 * @throws {Error} - Throws a standardized error with meaningful messages.
 */
export const handleMongoError = (error: unknown): never => {
  if (error instanceof MongoError) {
    if (error.code === 11000) {
      // Access the key causing the duplicate key error
      const key = Object.keys((error as unknown as { keyValue: Record<string, unknown> }).keyValue)[0];
      // Use formatError to standardize the error response
      const formattedError = formatError(new Error(`${key} already exists.`));
      throw new Error(formattedError.message); // Throw formatted error
    }
  }

  if (error instanceof Error && error.name === "ValidationError") {
    const validationErrors = Object.values(
      (error as MongoValidationError).errors
    ).map((err) => err.message);

    // Use formatError to standardize the error response
    const formattedError = formatError(new Error(`Validation failed: ${validationErrors.join(", ")}`));
    throw new Error(formattedError.message); // Throw formatted error
  }

  // Re-throw unexpected errors using formatError
  const formattedError = formatError(error);
  throw new Error(formattedError.message); // Throw formatted error
};
