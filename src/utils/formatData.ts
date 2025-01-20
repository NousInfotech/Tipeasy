import { IFormattedRestaurantData, IFormattedTippingData, IRestaurant, ITipping } from "@/types/schematypes";

const formatRestaurantDataForTable = (restaurants: IRestaurant[]): IFormattedRestaurantData[] => {
    const data = restaurants.map((restaurant: IRestaurant, index: number) => ({
        id: index + 1, // Use `_id` as `id`
        _id: restaurant._id,
        title: restaurant.title,
        qrURL: restaurant.qrCodeUrl || '/assets/primary-qr-code.png',
        qrStatus: restaurant.qrStatus,
        email: restaurant.email,
        phone: restaurant.phoneNumber, // Map `phoneNumber` to `phone`
    })) as IFormattedRestaurantData[];

    return data;
};

const formatTippingDataForTable = (tippings: ITipping[]): IFormattedTippingData[] => {
    const sortedTippings = tippings.sort((a, b) => 
        (b.dateTime ? new Date(b.dateTime).getTime() : 0) - (a.dateTime ? new Date(a.dateTime).getTime() : 0)
    ); // Sort in descending order (latest first)

    const data = sortedTippings.map((tipping: ITipping, index: number) => ({
        id: sortedTippings.length - index, // Assigning IDs in reverse order
        _id: tipping._id, // Keeping the original ID from MongoDB
        waiterId: tipping.waiterId, // String mapping from tipping data
        restaurantId: tipping.restaurantId, // String mapping from tipping data
        tipAmount: tipping.tipAmount, // Mapping the tipping amount
        date: tipping.dateTime ? new Date(tipping.dateTime).toLocaleDateString() : undefined, // Extract date
        time: tipping.dateTime ? new Date(tipping.dateTime).toLocaleTimeString() : undefined, // Extract time
    })) as IFormattedTippingData[];

    return data;
};


export { formatRestaurantDataForTable, formatTippingDataForTable };


