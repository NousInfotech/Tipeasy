import { z, ZodType, ZodTypeDef, ZodObject, ZodRawShape, ZodError } from "zod";


import { validateRestaurantId, validateMenuId, validateWaiterId } from '@/database/utils/queries';

/**
 * Validates if the given restaurantId exists in the database using `validateRestaurantId`.
 *
 * @param {string} restaurantId - The restaurant ID to validate.
 * @throws {Error} - Throws an error if the restaurantId is missing or cannot be found.
 * @returns {Promise<boolean>} - Returns true if the restaurantId is valid, otherwise throws an error.
 */
export const validateRestaurant = async (restaurantId: string): Promise<boolean> => {
    if (!restaurantId) {
        throw new Error("RestaurantId is Missing");
    }

    const isValid = await validateRestaurantId(restaurantId);
    if (!isValid) {
        throw new Error("Cannot Find Restaurant");
    }

    return true;
};

/**
 * Validates if the given menuId exists in the database using `validateMenuId`.
 *
 * @param {string} menuId - The menu ID to validate.
 * @throws {Error} - Throws an error if the menuId is missing or cannot be found.
 * @returns {Promise<boolean>} - Returns true if the menuId is valid, otherwise throws an error.
 */
export const validateMenu = async (menuId: string): Promise<boolean> => {
    if (!menuId) {
        throw new Error("MenuId is Missing");
    }

    const isValid = await validateMenuId(menuId);
    if (!isValid) {
        throw new Error("Cannot Find Menu");
    }

    return true;
};

/**
 * Validates if the given waiterId exists in the database using `validateWaiterId`.
 *
 * @param {string} waiterId - The waiter ID to validate.
 * @throws {Error} - Throws an error if the waiterId is missing or cannot be found.
 * @returns {Promise<boolean>} - Returns true if the waiterId is valid, otherwise throws an error.
 */
export const validateWaiter = async (waiterId: string): Promise<boolean> => {
    if (!waiterId) {
        throw new Error("WaiterId is Missing");
    }

    const isValid = await validateWaiterId(waiterId);
    if (!isValid) {
        throw new Error("Cannot Find Waiter");
    }

    return true;
};


/**
 * Validate data against a Zod schema with an option for partial validation.
 * 
 * @param {ZodType<T>} schema - The Zod schema to validate against.
 * @param {unknown} data - The data to validate.
 * @param {boolean} partial - Whether to apply partial validation (default is false).
 * @returns {T} - The validated data.
 * @throws {Error} - Throws a validation error with details if validation fails.
 */
export const validateSchema = <T>(
    schema: ZodType<T, ZodTypeDef, T>,
    data: unknown,
    partial: boolean = false
): T => {
    try {
        // Apply .partial() if schema is an object and partial is true
        const schemaToValidate =
            partial && schema instanceof ZodObject
                ? (schema.partial() as unknown as ZodType<T, ZodTypeDef, T>)
                : schema;

        // Validate the data against the (possibly partial) schema
        return schemaToValidate.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            // Attach error details for better context
            const details = error.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            }));
            const validationError = new Error("Validation failed");
            (validationError as { details?: { path: string; message: string }[] }).details = details;
            throw validationError;
        }
        throw error; // Re-throw unexpected errors
    }
};
