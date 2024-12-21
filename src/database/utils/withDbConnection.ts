import connectDb from "../connection";

/**
 * Higher-order function to ensure database connection is established before executing the handler.
 *
 * @param {Function} handler - The handler function that requires a database connection.
 * @returns {Function} - A wrapped handler function with the database connection.
 */
export const withDbConnection = <TArgs extends unknown[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>
): ((...args: TArgs) => Promise<TResult>) => {
  return async (...args: TArgs): Promise<TResult> => {
    await connectDb(); // Establish database connection
    return handler(...args); // Execute the actual handler logic
  };
};
