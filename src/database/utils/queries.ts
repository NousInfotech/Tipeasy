import { Restaurant } from "../models/Restaurant";
import { Menu } from "../models/Menu";
import { Waiter } from "../models/Waiter";
import { Order } from "../models/Order";
import { Tipping } from "../models/Tipping";

// CRUD Functions for Restaurant

// Create Restaurant
export const createRestaurant = async (restaurantData: unknown) => {
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    return restaurant;
};

// Get Restaurant by ID
export const getRestaurantById = async (restaurantId: string) => {
    console.log(restaurantId)
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
};
// Get Restaurants
export const getRestaurants = async () => {
    const restaurant = await Restaurant.find();
    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
};

// Update Restaurant
export const updateRestaurant = async (restaurantId: string, updatedData:Object) => {
    const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, updatedData, { new: true }).populate("menu waiters orders tippings");
    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
};

// Delete Restaurant
export const deleteRestaurant = async (restaurantId: string) => {
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");
    return { message: "Restaurant deleted successfully" };
};

// CRUD Functions for Menu

// Create Menu Item
export const createMenuItem = async (menuData: unknown) => {
    const menu = new Menu(menuData);
    await menu.save();
    return menu;
};

// Update Menu Item
export const getMenusByRestaurantId = async (restaurantId: string) => {
    const menus = await Menu.find({ restaurantId });
    if (!menus || menus.length === 0) throw new Error("No menu items found for this restaurant");
    return menus;
};

// Get Menu by ID
export const getMenuById = async (menuId: string) => {
    const menu = await Menu.findById(menuId);
    if (!menu) throw new Error("Menu item not found");
    return menu;
};

// Update Menu Item
export const updateMenuItem = async (menuId: string, updatedData:Object) => {
    const menu = await Menu.findByIdAndUpdate(menuId, updatedData, { new: true });
    if (!menu) throw new Error("Menu item not found");
    return menu;
};

// Delete Menu Item
export const deleteMenuItem = async (menuId: string) => {
    const menu = await Menu.findByIdAndDelete(menuId);
    if (!menu) throw new Error("Menu item not found");
    return { message: "Menu item deleted successfully" };
};

// CRUD Functions for Waiter

// Create Waiter
export const createWaiter = async (waiterData: unknown) => {
    const waiter = new Waiter(waiterData);
    await waiter.save();
    return waiter;
};

// Get Waiter by ID
export const getWaiterById = async (waiterId: string) => {
    const waiter = await Waiter.findById(waiterId).select("-bankDetails");
    if (!waiter) throw new Error("Waiter not found");
    return waiter;
};

// Get Waiters by RestaurantId 
export const getWaiterByRestaurantId = async (restaurantId: string) => {
    const waiters = await Waiter.find({ restaurantId }).select("-bankDetails");
    if (!waiters || waiters.length === 0) throw new Error("No waiters found for the specified restaurant");
    return waiters;
};


// Update Waiter
export const updateWaiter = async (waiterId: string, updatedData:object) => {
    const waiter = await Waiter.findByIdAndUpdate(waiterId, updatedData, { new: true });
    if (!waiter) throw new Error("Waiter not found");
    return waiter;
};

// Delete Waiter
export const deleteWaiter = async (waiterId: string) => {
    const waiter = await Waiter.findByIdAndDelete(waiterId);
    if (!waiter) throw new Error("Waiter not found");
    return { message: "Waiter deleted successfully" };
};

// Create an order
export const createOrder = async (orderData: unknown) => {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
};

// Get orders by restaurantId
export const getOrdersByRestaurantId = async (restaurantId: string) => {
    const orders = await Order.find({ restaurantId })
        .populate("menuItems.menuId", "title price")
        .sort({ dateTime: -1 });
    return orders;
};

// Get an order by orderId
export const getOrderById = async (orderId: string) => {
    const order = await Order.findById(orderId).populate("menuItems.menuId", "title price");
    return order;
};



export async function createTipping(tippingData: unknown) {
    const tipping = new Tipping(tippingData);
    await tipping.save();
    return tipping;
}


export async function getTippingsByRestaurantId(restaurantId: string) {
    const tippings = await Tipping.find({ restaurantId }).populate("waiterId", "name phoneNumber");
    return tippings;
}

export async function getTippingsByWaiterId(waiterId: string) {
    const tippings = await Tipping.find({ waiterId }).populate("restaurantId", "title phoneNumber");
    return tippings;
}


export async function getTippingById(tippingId: string) {
    const tipping = await Tipping.findById(tippingId).populate("restaurantId", "title").populate("waiterId", "name");
    return tipping;
}
