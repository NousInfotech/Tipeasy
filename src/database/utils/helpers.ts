// // Helper: transform data to return ObjectIds instead of populated objects
// export const transformReferences = (data: unknown, referenceFields: string[]) => {
//     referenceFields.forEach(field => {
//         if (data[field]) {
//             if (Array.isArray(data[field])) {
//                 data[field] = data[field].map((ref: unknown) => ref.toString());
//             } else {
//                 data[field] = data[field].toString();
//             }
//         }
//     });
//     return data;
// };

// // Helper: transform restaurant data to return ObjectIds
// export const transformRestaurant = (restaurant: unknown) => {
//     return {
//         ...restaurant.toObject(),
//         menu: restaurant.menu.map((item: unknown) => item.toString()), // Convert ObjectId references to string
//         waiters: restaurant.waiters.map((waiter: unknown) => waiter.toString()),
//         orders: restaurant.orders.map((order: unknown) => order.toString()),
//         tippings: restaurant.tippings.map((tipping: unknown) => tipping.toString()),
//     };
// };

// // Helper: transform menu data to return ObjectIds
// export const transformMenu = (menu: unknown) => {
//     return {
//         ...menu.toObject(),
//         restaurantId: menu.restaurantId.toString(), // Convert ObjectId references to string
//     };
// };

// // Helper: transform waiter data to return ObjectIds
// export const transformWaiter = (waiter: unknown) => {
//     return {
//         ...waiter.toObject(),
//         restaurant: waiter.restaurant.toString(),
//         tippings: waiter.tippings.map((tipping: unknown) => tipping.toString()),
//     };
// };
