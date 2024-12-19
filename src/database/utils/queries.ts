import { Restaurant, Menu, Waiter, Order, Tipping, User } from '../models'; // Assuming these are imported from your model file
import { IWaiter, IMenu, IOrder, IRestaurant, ITipping, IUser } from '@/types/schematypes';
/**
 * Validate if the given restaurantId exists.
 * @param {string} restaurantId - The restaurant ID to validate.
 * @returns {Promise<boolean>} - Returns true if the restaurant exists, otherwise false.
 */
export const validateRestaurantId = async (restaurantId: string): Promise<boolean> => {
    const restaurant = await Restaurant.findById(restaurantId);
    return restaurant !== null;
};

/**
 * Get all waiters for a given restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Waiter[]>} - Returns an array of waiters for the restaurant.
 */
export const getWaitersByRestaurantId = async (restaurantId: string): Promise<IWaiter[]> => {
    return await Waiter.find({ restaurantId });
};

/**
 * Get all menus for a given restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Menu[]>} - Returns an array of menus for the restaurant.
 */
export const getMenusByRestaurantId = async (restaurantId: string): Promise<IMenu[]> => {
    return await Menu.find({ restaurantId });
};

/**
 * Create an order based on menu items and the restaurantId.
 * @param {string} restaurantId - The ID of the restaurant.
 * @param {Array<{ menuId: string; quantity: number }>} menuItems - Array of menu items to include in the order.
 * @param {string} tableNo - The table number for the order.
 * @param {string} [customerName] - Optional customer name for the order.
 * @param {string} [phoneNumber] - Optional phone number for the order.
 * @returns {Promise<Order>} - Returns the created order object.
 */
export const createOrderByMenuIds = async (
    restaurantId: string,
    menuItems: { menuId: string; quantity: number }[],
    tableNo: string,
    customerName?: string,
    phoneNumber?: string
): Promise<IOrder> => {
    const menuPrices = await Promise.all(
        menuItems.map(async (item) => {
            const menu = await Menu.findById(item.menuId);
            return menu ? menu.price * item.quantity : 0; // Make sure menu exists
        })
    );

    // Sum the total amount synchronously
    const totalAmount = menuPrices.reduce((total, price) => total + price, 0);

    // Create and save the order
    const order = new Order({
        restaurantId,
        menuItems,
        tableNo,
        customerName,
        phoneNumber,
        totalAmount,
        status: "pending", // Default status
        dateTime: new Date(),
    });

    return await order.save();
};

/**
 * Create a tipping record based on waiterId and restaurantId.
 * @param {string} waiterId - The ID of the waiter.
 * @param {string} restaurantId - The ID of the restaurant.
 * @param {number} tipAmount - The amount tipped.
 * @param {number} rating - The rating given to the waiter (1-5).
 * @param {string} experience - The customer experience (e.g., "happy", "neutral").
 * @param {string} [comments] - Optional comments about the tipping experience.
 * @returns {Promise<Tipping>} - Returns the created tipping record.
 */
export const createTippingByWaiterId = async (
    waiterId: string,
    restaurantId: string,
    tipAmount: number,
    rating: number,
    experience: "very_sad" | "sad" | "neutral" | "happy" | "very_happy",
    comments?: string
): Promise<ITipping> => {
    const tipping = new Tipping({
        waiterId,
        restaurantId,
        tipAmount,
        rating,
        experience,
        paymentStatus: "pending", // Default status
        comments,
        dateTime: new Date(),
    });

    return await tipping.save();
};

/**
 * Get all orders for a specific restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Order[]>} - Returns an array of orders for the restaurant.
 */
export const getOrdersByRestaurantId = async (restaurantId: string): Promise<IOrder[]> => {
    return await Order.find({ restaurantId });
};

/**
 * Get all tippings for a specific restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Tipping[]>} - Returns an array of tippings for the restaurant.
 */
export const getTippingsByRestaurantId = async (restaurantId: string): Promise<ITipping[]> => {
    return await Tipping.find({ restaurantId });
};

/**
 * Fetch all restaurants from the database.
 * @returns {Promise<Restaurant[]>} - Returns an array of all restaurants.
 */
export const getRestaurants = async (): Promise<IRestaurant[]> => {
    return await Restaurant.find();
};

/**
 * Delete a specific restaurant by its restaurantId.
 * @param {string} restaurantId - The ID of the restaurant to delete.
 * @returns {Promise<void>} - Returns nothing once the restaurant is deleted.
 */
export const deleteRestaurant = async (restaurantId: string): Promise<void> => {
    await Restaurant.findByIdAndDelete(restaurantId);
    await Menu.deleteMany({ restaurantId });
    await Waiter.deleteMany({ restaurantId });
    await Tipping.deleteMany({ restaurantId });
};

/**
 * Fetch the role by userId.
 * @param {string} userId - The user ID for which the role is to be fetched.
 * @returns {Promise<string>} - Returns the role associated with the user.
 */
export const fetchRoleById = async (userId: string): Promise<string> => {
    const user = await User.findById(userId); // Assuming User model exists
    return user.role;
};

/**
 * Create a new user (superAdmin, admin, etc.).
 * @param {string} email - The email of the user.
 * @param {string} password - The password for the user.
 * @param {string} role - The role of the user (e.g., superAdmin, admin).
 * @returns {Promise<User>} - Returns the newly created user.
 */
export const createUser = async (
    email: string,
    password: string,
    role: string
): Promise<IUser> => {
    const newUser = new User({
        email,
        password, // Assuming password will be hashed before saving
        role,
    });

    return await newUser.save();
};

