import connectDb from "../connection";

export const withDbConnection = (
  handler: (...args: unknown[]) => Promise<unknown>
) => {
  return async (...args: unknown[]): Promise<unknown> => {
    await connectDb(); // Establish database connection
    return handler(...args); // Execute the actual handler logic
  };
};
