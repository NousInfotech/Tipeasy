import connectDb from "../connection";

export const withDbConnection = (handler: Function) => {
    return async (...args: any[]) => {
        await connectDb(); // Establish database connection
        return handler(...args); // Execute the actual handler logic
    };
};
