// Helper: transform data to return ObjectIds instead of populated objects
export const transformReferences = (data: any, referenceFields: string[]) => {
    referenceFields.forEach(field => {
        if (data[field]) {
            if (Array.isArray(data[field])) {
                data[field] = data[field].map((ref: any) => ref.toString());
            } else {
                data[field] = data[field].toString();
            }
        }
    });
    return data;
};

// Helper: transform restaurant data to return ObjectIds
export const transformRestaurant = (restaurant: any) => {
    return {
        ...restaurant.toObject(),
        menu: restaurant.menu.map((item: any) => item.toString()), // Convert ObjectId references to string
        waiters: restaurant.waiters.map((waiter: any) => waiter.toString()),
        orders: restaurant.orders.map((order: any) => order.toString()),
        tippings: restaurant.tippings.map((tipping: any) => tipping.toString()),
    };
};

// Helper: transform menu data to return ObjectIds
export const transformMenu = (menu: any) => {
    return {
        ...menu.toObject(),
        restaurantId: menu.restaurantId.toString(), // Convert ObjectId references to string
    };
};

// Helper: transform waiter data to return ObjectIds
export const transformWaiter = (waiter: any) => {
    return {
        ...waiter.toObject(),
        restaurant: waiter.restaurant.toString(),
        tippings: waiter.tippings.map((tipping: any) => tipping.toString()),
    };
};
