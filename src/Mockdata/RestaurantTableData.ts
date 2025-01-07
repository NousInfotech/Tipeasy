import { TableData } from "@/types/schematypes";

const restaurantMockData: TableData[] = [
    { "id": "rest_0", "name": 'Restaurant A', "qrStatus": 'none', "email": "restaurantA@example.com", "phone": "+1234567890" },
    { "id": "rest_1", "name": 'Restaurant B', "qrStatus": 'Generate', "email": "restaurantB@example.com", "phone": "+1234567891" },
    { "id": "rest_2", "name": 'Restaurant C', "qrStatus": 'Sent', "email": "restaurantC@example.com", "phone": "+1234567892" },
    { "id": "rest_3", "name": 'Restaurant D', "qrStatus": 'none', "email": "restaurantD@example.com", "phone": "+1234567893" },
    { "id": "rest_4", "name": 'Restaurant E', "qrStatus": 'Generate', "email": "restaurantE@example.com", "phone": "+1234567894" },
    { "id": "rest_5", "name": 'Restaurant F', "qrStatus": 'Sent', "email": "restaurantF@example.com", "phone": "+1234567895" },
    { "id": "rest_6", "name": 'Restaurant G', "qrStatus": 'Sent', "email": "restaurantG@example.com", "phone": "+1234567896" },
    { "id": "rest_7", "name": 'Restaurant H', "qrStatus": 'Sent', "email": "restaurantH@example.com", "phone": "+1234567897" },
    { "id": "rest_8", "name": 'Restaurant I', "qrStatus": 'Sent', "email": "restaurantI@example.com", "phone": "+1234567898" },
    { "id": "rest_9", "name": 'Restaurant J', "qrStatus": 'Sent', "email": "restaurantJ@example.com", "phone": "+1234567899" },
    { "id": "rest_10", "name": 'Restaurant K', "qrStatus": 'Sent', "email": "restaurantK@example.com", "phone": "+1234567800" },
];


const TippingData: TableData[] = [
    {
        id: "1",
        restaurantName: "Ocean Breeze Diner",
        waiterName: "John Doe",
        amount: 2500,
        time: "2025-01-07 14:30",
    },
    {
        id: "2",
        restaurantName: "Mountain View Grill",
        waiterName: "Jane Smith",
        amount: 1800,
        time: "2025-01-07 15:00",
    },
    {
        id: "3",
        restaurantName: "Sunset Cafe",
        waiterName: "Michael Johnson",
        amount: 3200,
        time: "2025-01-07 16:15",
    },
    {
        id: "4",
        restaurantName: "Riverbank Bistro",
        waiterName: "Emily Brown",
        amount: 1500,
        time: "2025-01-07 12:45",
    },
    {
        id: "5",
        restaurantName: "Lakeside Restaurant",
        waiterName: "Chris Wilson",
        amount: 2750,
        time: "2025-01-07 13:30",
    },
];

export { restaurantMockData, TippingData }