import { ITipping, TableData } from "@/types/schematypes";

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

const fakeTippings: ITipping[] = [
    {
        "_id": "472639",
        "waiterId": "66",
        "restaurantId": "1",
        "tipAmount": 749,
        "rating": 1,
        "experience": "very_happy",
        "razorpayPaymentId": "pay_602481",
        "razorpayFundId": "fund_671125",
        "comments": "Comment 9",
        "dateTime": new Date("2024-10-29 19:46:39")
    },
    {
        "_id": "717118",
        "waiterId": "15",
        "restaurantId": "3",
        "tipAmount": 961,
        "rating": 1,
        "experience": "neutral",
        "razorpayPaymentId": "pay_308513",
        "razorpayFundId": "fund_846801",
        "comments": "Comment 84",
        "dateTime": new Date("2024-12-08 19:46:39")
    },
    {
        "_id": "297985",
        "waiterId": "17",
        "restaurantId": "10",
        "tipAmount": 947,
        "rating": 3,
        "experience": "very_happy",
        "razorpayPaymentId": "pay_655247",
        "razorpayFundId": "fund_565354",
        "comments": "Comment 72",
        "dateTime": new Date("2024-02-20 19:46:39")
    },
    {
        "_id": "386867",
        "waiterId": "19",
        "restaurantId": "2",
        "tipAmount": 486,
        "rating": 2,
        "experience": "neutral",
        "razorpayPaymentId": "pay_654954",
        "razorpayFundId": "fund_866275",
        "comments": "Comment 7",
        "dateTime": new Date("2025-01-09 19:46:39")
    },
    {
        "_id": "482560",
        "waiterId": "78",
        "restaurantId": "7",
        "tipAmount": 516,
        "rating": 5,
        "experience": "very_sad",
        "razorpayPaymentId": "pay_232350",
        "razorpayFundId": "fund_679891",
        "comments": "Comment 36",
        "dateTime": new Date("2024-08-03 19:46:39")
    }
];


export { restaurantMockData, TippingData,fakeTippings }