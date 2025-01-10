import { IOrder } from "@/types/schematypes";

const mockOrders: IOrder[] = [
    {
        _id: "order1",
        menuItems: [
            { menuId: "item1", quantity: 2 },
            { menuId: "item2", quantity: 1 },
        ],
        restaurantId: "677d6f1c833c60c2b3be8f31",  // Updated restaurantId
        tableNo: "A1",
        customerName: "John Doe",
        phoneNumber: "1234567890",
        totalAmount: 750,
        dateTime: new Date("2025-01-11T14:30:00"),
        status: "pending",
        notes: "Allergic to peanuts",
    },
    {
        _id: "order2",
        menuItems: [
            { menuId: "item3", quantity: 3 },
            { menuId: "item4", quantity: 1 },
        ],
        restaurantId: "677d6f1c833c60c2b3be8f31",  // Updated restaurantId
        tableNo: "B2",
        customerName: "Jane Smith",
        phoneNumber: "0987654321",
        totalAmount: 1200,
        dateTime: new Date("2025-01-11T15:00:00"),
        status: "ongoing",
        notes: "No ice in drink",
    },
    {
        _id: "order3",
        menuItems: [
            { menuId: "item2", quantity: 2 },
            { menuId: "item5", quantity: 1 },
        ],
        restaurantId: "677d6f1c833c60c2b3be8f31",  // Updated restaurantId
        tableNo: "C3",
        customerName: "Alice Brown",
        phoneNumber: "1122334455",
        totalAmount: 600,
        dateTime: new Date("2025-01-11T15:30:00"),
        status: "served",
        notes: "No tomatoes",
    },
    {
        _id: "order4",
        menuItems: [
            { menuId: "item6", quantity: 1 },
            { menuId: "item3", quantity: 2 },
        ],
        restaurantId: "677d6f1c833c60c2b3be8f31",  // Updated restaurantId
        tableNo: "D4",
        customerName: "Bob White",
        phoneNumber: "6677889900",
        totalAmount: 900,
        dateTime: new Date("2025-01-11T16:00:00"),
        status: "pending",
        notes: "Extra spicy",
    },
    {
        _id: "order5",
        menuItems: [
            { menuId: "item7", quantity: 4 },
        ],
        restaurantId: "677d6f1c833c60c2b3be8f31",  // Updated restaurantId
        tableNo: "E5",
        customerName: "Charlie Green",
        phoneNumber: "2233445566",
        totalAmount: 1600,
        dateTime: new Date("2025-01-11T16:30:00"),
        status: "ongoing",
        notes: "Please deliver quickly",
    },
];

export default mockOrders;
