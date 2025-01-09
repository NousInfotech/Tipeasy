import { IFormattedRestaurantData, IRestaurant } from "@/types/schematypes";

const formatRestaurantDataForTable = (restaurants: IRestaurant[]): IFormattedRestaurantData[] => {
    const data = restaurants.map(restaurant => ({
        id: restaurant._id, // Use `_id` as `id`
        title: restaurant.title,
        qrStatus: restaurant.qrStatus,
        email: restaurant.email,
        phone: restaurant.phoneNumber, // Map `phoneNumber` to `phone`
    })) as IFormattedRestaurantData[];

    return data;
};



export { formatRestaurantDataForTable }
