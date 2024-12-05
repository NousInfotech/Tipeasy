import { Restaurant } from "../models/Restaurant";
import { Menu } from "../models/Menu";
import { Waiter } from "../models/Waiter";

// CRUD Functions for Restaurant

// Create Restaurant
export const createRestaurant = async (restaurantData: any) => {
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    return restaurant;
};

// Get Restaurant by ID
export const getRestaurantById = async (restaurantId: string) => {
    const restaurant = await Restaurant.findById(restaurantId).populate("menu waiters orders tippings");
    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
};

// Update Restaurant
export const updateRestaurant = async (restaurantId: string, updatedData: any) => {
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
export const createMenuItem = async (menuData: any) => {
    const menu = new Menu(menuData);
    await menu.save();
    return menu;
};

// Get Menu by ID
export const getMenuById = async (menuId: string) => {
    const menu = await Menu.findById(menuId);
    if (!menu) throw new Error("Menu item not found");
    return menu;
};

// Update Menu Item
export const updateMenuItem = async (menuId: string, updatedData: any) => {
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
export const createWaiter = async (waiterData: any) => {
    const waiter = new Waiter(waiterData);
    await waiter.save();
    return waiter;
};

// Get Waiter by ID
export const getWaiterById = async (waiterId: string) => {
    const waiter = await Waiter.findById(waiterId).populate("restaurant tippings");
    if (!waiter) throw new Error("Waiter not found");
    return waiter;
};

// Update Waiter
export const updateWaiter = async (waiterId: string, updatedData: any) => {
    const waiter = await Waiter.findByIdAndUpdate(waiterId, updatedData, { new: true }).populate("restaurant tippings");
    if (!waiter) throw new Error("Waiter not found");
    return waiter;
};

// Delete Waiter
export const deleteWaiter = async (waiterId: string) => {
    const waiter = await Waiter.findByIdAndDelete(waiterId);
    if (!waiter) throw new Error("Waiter not found");
    return { message: "Waiter deleted successfully" };
};
