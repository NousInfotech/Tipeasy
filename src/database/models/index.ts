// index.ts - Importing and Exporting all models from the '../models' file

import { Restaurant } from "../models/Restaurant";
import { Menu } from "../models/Menu";
import { Waiter } from "../models/Waiter";
import { Order } from "../models/Order";
import { Tipping } from "../models/Tipping";
import { User } from "../models/User"; // Assuming a User model exists for authentication

export {
    Restaurant,
    Menu,
    Waiter,
    Order,
    Tipping,
    User,
};
