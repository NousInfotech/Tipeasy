import { Restaurant, Menu, Waiter, Order, Tipping, User } from '../models'; // Assuming these are imported from your model file
import { IWaiter, IMenu, IOrder, IRestaurant, ITipping, IUser } from '@/types/schematypes';
import { handleMongoError } from './MongoError';

/**
 * Creates a new restaurant in the database.
 * 
 * @param {IRestaurant} restaurantData - The restaurant data used to create a new restaurant.
 * @returns {Promise<Restaurant>} A promise that resolves to the created restaurant document.
 */
export const createRestaurant = async (restaurantData: IRestaurant): Promise<IRestaurant> => {
    try {
        // Create a new restaurant document with the provided restaurant data
        const restaurant = new Restaurant(restaurantData);

        // Save the restaurant document to the database
        await restaurant.save();

        return restaurant; // Return the created restaurant
    } catch (error) {
        return handleMongoError(error);;
    }
};

/**
 * Creates a new restaurant in the database.
 * 
 * @param {IMenu} menuData - The restaurant data used to create a new restaurant.
 * @returns {Promise<Menu>} A promise that resolves to the created restaurant document.
 */
export const createMenu = async (menuData: IMenu): Promise<IMenu> => {
    try {
        // Create a new restaurant document with the provided restaurant data
        const menu = new Menu(menuData);

        // Save the restaurant document to the database
        await menu.save();

        return menu; // Return the created restaurant
    } catch (error) {
        return handleMongoError(error);;
    }
};

/**
 * Creates a new waiter in the database.
 * 
 * @param {IWaiter} waiterData - The waiter data used to create a new waiter.
 * @returns {Promise<IWaiter>} A promise that resolves to the created waiter document.
 */
export const createWaiter = async (waiterData: IWaiter): Promise<IWaiter> => {
    try {
        // Create a new waiter document with the provided waiter data
        const waiter = new Waiter(waiterData);

        // Save the waiter document to the database
        await waiter.save();

        return waiter; // Return the created waiter
    } catch (error) {
        return handleMongoError(error); // Handle any errors that occur during the operation
    }
};


/**
 * Create a new user (superAdmin, admin, etc.).
 * @param {IUser} userData - The email of the user.
 * @returns {Promise<User>} - Returns the newly created user.
 */
export const createUser = async (
    userData: IUser
): Promise<IUser> => {
    try {
        const newUser = new User({
            userData
        });

        return await newUser.save();
    } catch (error) {
        return handleMongoError(error)
    }
};


/**
 * Validate if the given restaurantId exists.
 * @param {string} restaurantId - The restaurant ID to validate.
 * @returns {Promise<boolean>} - Returns true if the restaurant exists, otherwise false.
 */
export const validateRestaurantId = async (restaurantId: string): Promise<boolean> => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        return restaurant !== null;
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Validate if the given menuId exists in the Menu collection.
 * 
 * @param {string} menuId - The menu ID to validate.
 * @returns {Promise<boolean>} - Returns true if the menu exists, otherwise false.
 */
export const validateMenuId = async (menuId: string): Promise<boolean> => {
    const menu = await Menu.findById(menuId);
    return menu !== null;
};

/**
 * Validate if the given waiterId exists in the Waiter collection.
 * 
 * @param {string} waiterId - The waiter ID to validate.
 * @returns {Promise<boolean>} - Returns true if the waiter exists, otherwise false.
 */
export const validateWaiterId = async (waiterId: string): Promise<boolean> => {
    const waiter = await Waiter.findById(waiterId);
    return waiter !== null;
};


/**
 * Fetch a restaurant by its ID.
 * 
 * @param {string} restaurantId - The ID of the restaurant to fetch.
 * @returns {Promise<Restaurant | null>} - The restaurant document, or null if not found.
 */
export const getRestaurantById = async (restaurantId: string): Promise<IRestaurant> => {
    try {
        const restaurant = await Restaurant.findById(restaurantId).exec();
        return restaurant;
    } catch (error) {
        return handleMongoError(error);
    }
};


/**
 * Update a restaurant by its ID.
 * 
 * @param {string} restaurantId - The ID of the restaurant to update.
 * @param {Partial<IRestaurant>} updateData - The fields to update in the restaurant.
 * @returns {Promise<IRestaurant>} - The updated restaurant document, or null if not found.
 */
export const updateRestaurant = async (restaurantId: string, updateData: Partial<IRestaurant>): Promise<IRestaurant | unknown> => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, updateData, {
            new: true, // Returns the updated document
            runValidators: true, // Ensures validations run for the update
        }).exec();

        if (!updatedRestaurant) {
            throw new Error(`Restaurant with ID ${restaurantId} not found.`);
        }

        return updatedRestaurant;
    } catch (error) {
        handleMongoError(error);
    }
};



/**
 * Get all waiters for a given restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Waiter[]>} - Returns an array of waiters for the restaurant.
 */
export const getWaitersByRestaurantId = async (restaurantId: string): Promise<IWaiter[]> => {
    try {
        return await Waiter.find({ restaurantId });
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Get all menus for a given restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Menu[]>} - Returns an array of menus for the restaurant.
 */
export const getMenusByRestaurantId = async (restaurantId: string): Promise<IMenu[]> => {
    try {
        return await Menu.find({ restaurantId });
    } catch (error) {
        return handleMongoError(error)
    }
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
    try {
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
    } catch (error) {
        return handleMongoError(error)
    }
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

    try {
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
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Get all orders for a specific restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Order[]>} - Returns an array of orders for the restaurant.
 */
export const getOrdersByRestaurantId = async (restaurantId: string): Promise<IOrder[]> => {
    try {
        return await Order.find({ restaurantId });
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Get all tippings for a specific restaurant.
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Tipping[]>} - Returns an array of tippings for the restaurant.
 */
export const getTippingsByRestaurantId = async (restaurantId: string): Promise<ITipping[]> => {
    try {
        return await Tipping.find({ restaurantId });
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Get all tippings for a specific restaurant.
 * @param {string} waiterId - The ID of the restaurant.
 * @returns {Promise<Tipping[]>} - Returns an array of tippings for the restaurant.
 */
export const getTippingsByWaiterId = async (waiterId: string): Promise<ITipping[]> => {
    try {
        return await Tipping.find({ waiterId });
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Fetch all restaurants from the database.
 * @returns {Promise<Restaurant[]>} - Returns an array of all restaurants.
 */
export const getRestaurants = async (): Promise<IRestaurant[]> => {
    try {
        return await Restaurant.find();
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Delete a specific restaurant by its restaurantId.
 * @param {string} restaurantId - The ID of the restaurant to delete.
 * @returns {Promise<void>} - Returns nothing once the restaurant is deleted.
 */
export const deleteRestaurant = async (restaurantId: string): Promise<void> => {
    try {
        await Restaurant.findByIdAndDelete(restaurantId);
        await Menu.deleteMany({ restaurantId });
        await Waiter.deleteMany({ restaurantId });
        await Tipping.deleteMany({ restaurantId });
    } catch (error) {
        return handleMongoError(error)
    }
};

/**
 * Fetch the role by userId.
 * @param {string} firebaseId - The user ID for which the role is to be fetched.
 * @returns {Promise<string>} - Returns the role associated with the user.
 */
export const fetchRoleById = async (firebaseId: string): Promise<string> => {
    const waiter = await Waiter.findOne({ "firebaseId": firebaseId });

    if (waiter) {
        return "waiter";
    }
    // If not a waiter, check User for roles
    const user = await User.findOne({ firebaseId });
    if (user) {
        const role = user.role.toLowerCase(); // assuming `role` is a field in your User model
        if (role === "admin") {
            return "admin";
        } else if (role === "superadmin") {
            return "superadmin";
        }
    }

    return "";
}

/**
 * Get a waiter by their ID.
 *
 * @param {string} waiterId - The ID of the waiter to fetch.
 * @returns {Promise<IWaiter | null>} - The waiter document if found, null if not.
 */
export const getWaiterById = async (waiterId: string): Promise<IWaiter | null> => {
    try {
        const waiter = await Waiter.findById(waiterId).exec();
        return waiter;
    } catch (error) {
        console.error('Error fetching waiter by ID:', error);
        throw new Error('Database query failed');
    }
};

/**
 * Update a waiter by their ID.
 *
 * @param {string} waiterId - The ID of the waiter to update.
 * @param {Partial<IWaiter>} updateData - The fields to update in the waiter document.
 * @returns {Promise<IWaiter | null>} - The updated waiter document if successful, null if not found.
 */
export const updateWaiter = async (
    waiterId: string,
    updateData: Partial<IWaiter>
): Promise<IWaiter | null> => {
    try {
        const updatedWaiter = await Waiter.findByIdAndUpdate(waiterId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validations run on update
        }).exec();
        return updatedWaiter;
    } catch (error) {
        console.error('Error updating waiter:', error);
        throw new Error('Database update failed');
    }
};

/**
 * Delete a waiter by their ID.
 *
 * @param {string} waiterId - The ID of the waiter to delete.
 * @returns {Promise<boolean>} - Returns true if the waiter was deleted, false if not found.
 */
export const deleteWaiter = async (waiterId: string): Promise<boolean> => {
    try {
        const result = await Waiter.findByIdAndDelete(waiterId).exec();
        return result !== null;
    } catch (error) {
        console.error('Error deleting waiter:', error);
        throw new Error('Database delete failed');
    }
};

/**
 * Get a menu by its ID.
 *
 * @param {string} menuId - The ID of the menu to fetch.
 * @returns {Promise<IMenu | null>} - The menu document if found, null if not.
 */
export const getMenuById = async (menuId: string): Promise<IMenu | null> => {
    try {
        const menu = await Menu.findById(menuId).exec();
        return menu;
    } catch (error) {
        console.error('Error fetching menu by ID:', error);
        throw new Error('Database query failed');
    }
};

/**
 * Update a menu by its ID.
 *
 * @param {string} menuId - The ID of the menu to update.
 * @param {Partial<IMenu>} updateData - The fields to update in the menu document.
 * @returns {Promise<IMenu | null>} - The updated menu document if successful, null if not found.
 */
export const updateMenu = async (
    menuId: string,
    updateData: Partial<IMenu>
): Promise<IMenu | null> => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validations run on update
        }).exec();
        return updatedMenu;
    } catch (error) {
        console.error('Error updating menu:', error);
        throw new Error('Database update failed');
    }
};

/**
 * Delete a menu by its ID.
 *
 * @param {string} menuId - The ID of the menu to delete.
 * @returns {Promise<boolean>} - Returns true if the menu was deleted, false if not found.
 */
export const deleteMenu = async (menuId: string): Promise<boolean> => {
    try {
        const result = await Menu.findByIdAndDelete(menuId).exec();
        return result !== null;
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw new Error('Database delete failed');
    }
};




