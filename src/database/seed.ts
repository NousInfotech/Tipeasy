import mongoose from "mongoose";
import connectDB from "./connection.ts";
import { User } from "./models/User.ts";
import { Restaurant } from "./models/Restaurant.ts";
import { Menu } from "./models/Menu.ts";
import { Waiter } from "./models/Waiter.ts";

const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected");

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Menu.deleteMany({});
    await Waiter.deleteMany({});
    console.log("Existing data cleared");

    // Seed SuperAdmin
    const superAdmin = new User({
      username: "Super Admin",
      email: "superadmin@example.com",
      phoneNumber: "1234567890",
      firebaseId: "firebase-superadmin-id",
      role: "superAdmin",
    });
    await superAdmin.save();
    console.log("SuperAdmin seeded");

    // Seed Admin
    const admin = new User({
      username: "Admin User",
      email: "admin@example.com",
      phoneNumber: "0987654321",
      firebaseId: "firebase-admin-id",
      role: "admin",
    });
    await admin.save();
    console.log("Admin seeded");

    // Seed Restaurant
    const restaurant = new Restaurant({
      title: "The Great Restaurant",
      dietaryPreferences: [
        { type: "veg", description: "Suitable for vegetarians" },
        { type: "non-veg", description: "Includes meat and seafood" },
      ],
      googleLocation: "https://goo.gl/maps/example",
      email: "restaurant@example.com",
      phoneNumber: "9876543210",
      description: "A fantastic place to dine.",
      address: {
        no: "10",
        street: "Main Street",
        townCity: "Hyderabad",
        pinCode: "500081",
        district: "Hyderabad",
        state: "Telangana",
        country: "India",
      },
      profileImage: "/path/to/image.jpg",
      qrCodeUrl: "/path/to/qr-code.jpg",
      admin: admin._id,
    });

    await restaurant.save();
    console.log("Restaurant seeded");

    // Seed Menu
    const menuItems = [
      {
        title: "Paneer Butter Masala",
        description: "Rich and creamy paneer dish.",
        imgSrc: "/path/to/paneer-image.jpg",
        price: 250,
        category: "Main Course",
        availability: "available",
        dietaryPreference: "veg",
        restaurantId: restaurant._id,
      },
      {
        title: "Chicken Curry",
        description: "Spicy and flavorful chicken curry.",
        imgSrc: "/path/to/chicken-image.jpg",
        price: 350,
        category: "Main Course",
        availability: "available",
        dietaryPreference: "non-veg",
        restaurantId: restaurant._id,
      },
    ];

    await Menu.insertMany(menuItems);
    console.log("Menu items seeded.");

    // Seed Waiters
    const waiter = new Waiter({
      name: "John Doe",
      phoneNumber: "9876543211",
      restaurantId: restaurant._id, // Use the correct field name from the schema
      ratings: 4.5,
      firebaseId: "firebase-waiter-id",
      imgSrc: "/path/to/waiter-image.jpg",
      bankDetails: {
        ifsc: "HDFC0001234",
        accountName: "John Doe",
        accountNumber: "123456789",
        razorpayFundAccountId: "fund-razorpay-id", // Optional, so this is fine
      },
    });

    await waiter.save();
    console.log("Waiter seeded");

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

seedDatabase();
