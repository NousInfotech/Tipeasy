import mongoose from "mongoose";
import { Restaurant } from './models/Restaurant.ts'
import { User } from "./models/User.ts";
import { Menu } from "./models/Menu.ts";
import { Waiter } from "./models/Waiter.ts";
import { Order } from "./models/Order.ts";
import { Tipping } from "./models/Tipping.ts";

import connectDb from "./connection.ts";
// Seed Data
const seedData = [
  {
    title: "Tasty Bites",
    googleLocation: "https://goo.gl/maps/example1",
    email: "contact@tastybites.com",
    phoneNumber: "+911234567890",
    description: "A cozy place for delicious meals and snacks.",
    address: {
      no: "12A",
      street: "Main Street",
      area: "Downtown",
      townCity: "Mumbai",
      pinCode: "400001",
      district: "Mumbai Suburban",
      state: "Maharashtra",
      country: "India",
    },
    profileImage: "https://example.com/images/tastybites.jpg",
    qrStatus: "generated",
    qrCodeUrl: "https://example.com/qrcodes/tastybites",
  },
  {
    title: "Spice Heaven",
    googleLocation: "https://goo.gl/maps/example2",
    email: "info@spiceheaven.com",
    phoneNumber: "+919876543210",
    description: "Authentic Indian spices and curries.",
    address: {
      no: "45B",
      street: "Heritage Road",
      area: "Old Town",
      townCity: "Delhi",
      pinCode: "110001",
      district: "Central Delhi",
      state: "Delhi",
      country: "India",
    },
    profileImage: "https://example.com/images/spiceheaven.jpg",
    qrStatus: "sent",
    qrCodeUrl: "https://example.com/qrcodes/spiceheaven",
  },
];

const seedRestaurants = async () => {
  try {
    // Connect to the database
    await connectDb();

    // Clear the Restaurant collection
    await Restaurant.deleteMany({});
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Menu.deleteMany({});
    await Waiter.deleteMany({});
    await Order.deleteMany({});
    await Tipping.deleteMany({});
    console.log("Cleared existing restaurants from the database.");

    // Insert seed data
    const createdRestaurants = await Restaurant.insertMany(seedData);
    console.log("Inserted seed restaurants:", createdRestaurants);

    // Close the connection
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding restaurants:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeding script
seedRestaurants();
