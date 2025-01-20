import { IFormattedRestaurantData, IRestaurant } from "@/types/schematypes";

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



export { formatRestaurantDataForTable }
