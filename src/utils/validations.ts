import { NextApiRequest, NextApiResponse } from "next";

/**
 * Helper function to validate if a string is a valid email.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/**
 * Helper function to validate if a value is a non-empty string.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is a non-empty string, false otherwise.
 */
export const isNonEmptyString = (value: string): boolean => {
    if (value && value.trim() !== "") {
        return true
    }
    return false;
};

/**
 * Validate incoming request body for restaurant data.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {boolean} - Returns true if the data is valid, otherwise sends an error response.
 */
export const validateRestaurantData = (req: NextApiRequest, res: NextApiResponse): boolean => {
    const { name, description, location } = req.body;

    // Check if all required fields are present and valid
    if (!isNonEmptyString(name)) {
        res.status(400).json({ success: false, message: "Restaurant name is required" });
        return false;
    }
    if (!isNonEmptyString(description)) {
        res.status(400).json({ success: false, message: "Restaurant description is required" });
        return false;
    }
    if (!isNonEmptyString(location)) {
        res.status(400).json({ success: false, message: "Restaurant location is required" });
        return false;
    }

    return true;
};

/**
 * Validate incoming request body for waiter data.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {boolean} - Returns true if the data is valid, otherwise sends an error response.
 */
export const validateWaiterData = (req: NextApiRequest, res: NextApiResponse): boolean => {
    const { name, email } = req.body;

    if (!isNonEmptyString(name)) {
        res.status(400).json({ success: false, message: "Waiter name is required" });
        return false;
    }
    if (!isValidEmail(email)) {
        res.status(400).json({ success: false, message: "Invalid email format" });
        return false;
    }

    return true;
};

/**
 * Validate incoming request body for menu item data.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {boolean} - Returns true if the data is valid, otherwise sends an error response.
 */
export const validateMenuItemData = (req: NextApiRequest, res: NextApiResponse): boolean => {
    const { name, price, description } = req.body;

    if (!isNonEmptyString(name)) {
        res.status(400).json({ success: false, message: "Menu item name is required" });
        return false;
    }
    if (typeof price !== "number" || price <= 0) {
        res.status(400).json({ success: false, message: "Price must be a positive number" });
        return false;
    }
    if (!isNonEmptyString(description)) {
        res.status(400).json({ success: false, message: "Menu item description is required" });
        return false;
    }

    return true;
};

