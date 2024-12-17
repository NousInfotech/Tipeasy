import connectDB from "./connection.ts";
import { User } from "./models/User.ts";
import { Restaurant } from "./models/Restaurant.ts";
import { Menu } from "./models/Menu.ts";
import { Waiter } from "./models/Waiter.ts";
import { Order } from "./models/Order.ts";
import { Tipping } from "./models/Tipping.ts";

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
    await Order.deleteMany({});
    await Tipping.deleteMany({});
    console.log("Existing data cleared");

    // Seed superadmin
    const superadmin = new User({
      username: "Super Admin",
      email: "superadmin@example.com",
      phoneNumber: "1234567890",
      firebaseId: "firebase-superadmin-id",
      role: "superadmin",
    });
    await superadmin.save();
    console.log("superadmin seeded");

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
      {
        title: "Tandoori Roti",
        description: "Soft and fresh tandoori bread.",
        imgSrc: "/path/to/roti-image.jpg",
        price: 50,
        category: "Bread",
        availability: "available",
        dietaryPreference: "veg",
        restaurantId: restaurant._id,
      },
      {
        title: "Butter Chicken",
        description: "Classic butter chicken curry.",
        imgSrc: "/path/to/butter-chicken-image.jpg",
        price: 400,
        category: "Main Course",
        availability: "available",
        dietaryPreference: "non-veg",
        restaurantId: restaurant._id,
      },
      {
        title: "Gulab Jamun",
        description: "Sweet dessert balls in syrup.",
        imgSrc: "/path/to/gulab-jamun-image.jpg",
        price: 150,
        category: "Dessert",
        availability: "available",
        dietaryPreference: "veg",
        restaurantId: restaurant._id,
      },
      {
        title: "Veg Fried Rice",
        description: "Delicious fried rice with vegetables.",
        imgSrc: "/path/to/fried-rice-image.jpg",
        price: 200,
        category: "Rice",
        availability: "available",
        dietaryPreference: "veg",
        restaurantId: restaurant._id,
      },
    ];

    const createdMenus = await Menu.insertMany(menuItems);
    console.log("Menu items seeded.");

    // Seed Waiters
    const waiters = [
      {
        name: "John Doe",
        phoneNumber: "1234567890",
        email: "waiter12@gmail.com",
        restaurantId: restaurant._id,
        firebaseId: "firebase-john-id",
        imgSrc: "https://example.com/john-image.jpg",
        bankDetails: {
          ifsc: "ABCD0123456",
          accountName: "John Doe",
          accountNumber: "123456789012",
        },
      },
      {
        name: "Jane Smith",
        phoneNumber: "0987654321",
        email: "waiter1@gmail.com",
        restaurantId: restaurant._id,
        firebaseId: "firebase-jane-id",
        imgSrc: "https://example.com/jane-image.jpg",
        bankDetails: {
          ifsc: "EFGH0987654",
          accountName: "Jane Smith",
          accountNumber: "987654321098",
        },
      },
      {
        name: "Alice Johnson",
        phoneNumber: "1122334455",
        email: "waiter2@gmail.com",
        restaurantId: restaurant._id,
        firebaseId: "firebase-alice-id",
        imgSrc: "https://example.com/alice-image.jpg",
        bankDetails: {
          ifsc: "IJKL1234567",
          accountName: "Alice Johnson",
          accountNumber: "567890123456",
        },
      },
    ];

    const createdWaiters = await Waiter.insertMany(waiters);
    console.log("Waiters seeded");

    // Update Restaurant with menu and waiter references
    restaurant.menu = createdMenus.map((menu) => menu._id);
    restaurant.waiters = createdWaiters.map((waiter) => waiter._id);
    await restaurant.save();
    console.log("Restaurant updated with menu and waiter references");

    // Seed Orders
    const order = new Order({
      menuItems: [
        { menuId: createdMenus[0]._id, quantity: 2 }, // Paneer Butter Masala
        { menuId: createdMenus[1]._id, quantity: 1 }, // Chicken Curry
      ],
      restaurantId: restaurant._id,
      tableNo: "A1",
      customerName: "Customer One",
      totalAmount: 850, // Total price calculated manually for now
      status: "pending",
    });
    await order.save();
    console.log("Order seeded");


    // Seed Tipping
    const tipping = new Tipping({
      waiterId: createdWaiters[0]._id,
      restaurantId: restaurant._id,
      tipAmount: 100,
      rating: 5,
      experience: "very_happy",
      paymentStatus: "received_master",
      paymentId: "payment_12345",
      fundTransactionId: "fund_12345",
    });
    await tipping.save();
    console.log("Tipping seeded");

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

seedDatabase();
