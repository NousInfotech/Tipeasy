import { payTip } from "@/api/tippingsApi"; // Import the payTip function
import { ITipping } from "@/types/schematypes";

/**
 * Function to send multiple tipping entries for predefined data.
 */
export const createMultipleTippings = async () => {
    const restaurantId = "676707e6d19dbda2a43bf3ef"; // Predefined restaurantId
    const waiterIds = [
        "676707ebd19dbda2a43bf3f5",
        "676707edd19dbda2a43bf3f9",
        "676707eed19dbda2a43bf3fd"
    ]; // Predefined waiterIds array

    const tipAmount = 100; // Predefined tip amount (100 rupees)
    const rating = 5; // Predefined rating (5 stars)
    const experience = 'very_happy'

    // Loop through each waiter and send the tipping data
    for (const waiterId of waiterIds) {
        const tippingData = {
            waiterId,
            restaurantId,
            tipAmount,
            rating,
            experience,
            comments: "Great service!", // Optional comment
        };

        try {
            // Call the payTip function to send each tipping entry
            await payTip(tippingData as ITipping);
            console.log(`Tipping entry created for waiter ${waiterId}`);
        } catch (error) {
            console.error(`Error creating tipping entry for waiter ${waiterId}:`, error);
        }
    }
};

