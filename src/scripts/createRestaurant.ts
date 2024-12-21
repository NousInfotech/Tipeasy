import { createRestaurant, createMenu, createWaiter, generateRestaurantQr } from "@/api/restaurantApi.ts";
import { IMenu, IRestaurant, IWaiter } from "@/types/schematypes.ts";


// Helper function to generate unique phone numbers
const generatePhoneNumber = (index: number) => `+123456789${index.toString().padStart(4, '0')}`;

// Helper function to create waiter data
const createWaiterData = (restaurantId: string, index: number) => ({
    name: `Waiter ${index}`,
    phoneNumber: generatePhoneNumber(index),
    email: `nouseprime${index}@gmail.com`,
    password: `password${index}`,  // Firebase will handle password
    restaurantId: restaurantId,
    ratings: 5,
    bankDetails: {
        ifsc: "SBIN000910" + index,
        accountName: "Waiter" + index,
        accountNumber: "11223344556" + index,
        razorpayFundAccountId: "rzp_account_112233445" + index
    },
    imgSrc: `https://res.cloudinary.com/dkeraxhjs/image/upload/f_auto,q_auto/v1/waiters/ufnqy9ldjonljrd6mc3g`
});

// Helper function to create menu data with random categories and dietary preferences
const createMenuData = (restaurantId: string, title: string, imgSrc: string, dietaryPreference: 'Veg' | 'Non-Veg' | 'Vegan') => {
    const categories = ['Main Course', 'Starter', 'Dessert', 'Beverage', 'Salad']; // Random categories
    const category = categories[Math.floor(Math.random() * categories.length)];

    return {
        title,
        description: `${title} description`,
        imgSrc,
        price: 200, // example price, can be adjusted
        category,
        availability: 'available',
        dietaryPreference,  // Veg, Non-Veg, or Vegan
        restaurantId
    };
};

// Main function to create restaurant, waiters, and menus
const createRestaurantAndData = async () => {

    console.log("HI");

    try {
        // Step 1: Create restaurant
        const restaurantData = {
            title: "Amazing Restaurant",
            phoneNumber: "+12345678901",
            profileImage: 'https://res.cloudinary.com/dkeraxhjs/image/upload/v1734775767/restaurantCoverImages/soxrbowq6bj9bcecntau.jpg',
            address: {
                no: "123",
                street: "Main Street",
                townCity: "Cityville",
                pinCode: "123456",
                district: "District A",
                state: "State X",
                country: "Country Y",
            },
            qrStatus: 'none'
        };


        console.log(restaurantData)

        const restaurant = await createRestaurant(restaurantData as IRestaurant) as IRestaurant;
        const restaurantId = restaurant._id;

        console.log(`Restaurant Created: ${restaurantId}`);

        // Step 2: Generate QR code for the restaurant
        await generateRestaurantQr(restaurantId as string);
        console.log(`Restaurant QR Code Generated for: ${restaurantId}`);

        // Step 3: Create Waiters
        for (let i = 1; i <= 3; i++) {
            const waiterData = createWaiterData(restaurantId as string, i);
            const waiter = await createWaiter(waiterData as IWaiter) as IWaiter;
            console.log(`Waiter Created: ${waiter.name}`);
        }

        // Step 4: Create Menus
        const menuItems = [
            createMenuData(restaurantId as string, 'Chicken Tandoori', 'https://res.cloudinary.com/dkeraxhjs/image/upload/f_auto,q_auto/v1/menus/kkc2qzwp5qelyx0qwyuk', 'Non-Veg'),
            createMenuData(restaurantId as string, 'Veg Briyani', 'https://res.cloudinary.com/dkeraxhjs/image/upload/f_auto,q_auto/v1/menus/a08dqsvpjn1lbumfchsp', 'Veg'),
            createMenuData(restaurantId as string, 'Non-Veg Briyani', 'https://res.cloudinary.com/dkeraxhjs/image/upload/f_auto,q_auto/v1/menus/a08dqsvpjn1lbumfchsp', 'Non-Veg'),
            createMenuData(restaurantId as string, 'Vegan Briyani', 'https://res.cloudinary.com/dkeraxhjs/image/upload/f_auto,q_auto/v1/menus/a08dqsvpjn1lbumfchsp', 'Vegan')
        ];

        for (const menuData of menuItems) {
            await createMenu(menuData as IMenu);
            console.log(`Menu Created: ${menuData.title}`);
        }

        console.log("Restaurant, Waiters, and Menus Created Successfully!");

    } catch (error) {
        console.error("Error creating data:", error);
    }
};

export { createRestaurantAndData };
