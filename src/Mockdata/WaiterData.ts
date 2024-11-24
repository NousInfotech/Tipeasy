import { Waiter } from "@/types";
import assets from "../../public/assets/assets";

const waitersMockData: Waiter[] = [
    {
        waiterId: '1',
        restaurantId: '3', // value of 3 for restaurantId
        name: 'John Doe',
        imageSrc: assets.waiter,
        rating: 4.5,
        activeStatus: true,
    },
    {
        waiterId: '2',
        restaurantId: '3',
        name: 'Jane Smith',
        imageSrc: assets.waiter,
        rating: 3.8,
        activeStatus: true,
    },
    {
        waiterId: '3',
        restaurantId: '3',
        name: 'Alex Johnson',
        imageSrc: assets.waiter,
        rating: 4.7,
        activeStatus: true,
    },
    {
        waiterId: '4',
        restaurantId: '3',
        name: 'Emily Davis',
        imageSrc: assets.waiter,
        rating: 4.0,
        activeStatus: true,
    },
    {
        waiterId: '5',
        restaurantId: '3',
        name: 'Michael Brown',
        imageSrc: assets.waiter,
        rating: 4.3,
        activeStatus: true,
    },
    {
        waiterId: '6',
        restaurantId: '3',
        name: 'Sophia Lee',
        imageSrc: assets.waiter,
        rating: 4.6,
        activeStatus: true,
    },
    {
        waiterId: '7',
        restaurantId: '3',
        name: 'David Wilson',
        imageSrc: assets.waiter,
        rating: 3.9,
        activeStatus: true,
    },
    {
        waiterId: '8',
        restaurantId: '3',
        name: 'Olivia Taylor',
        imageSrc: assets.waiter,
        rating: 4.2,
        activeStatus: true,
    },
    {
        waiterId: '9',
        restaurantId: '3',
        name: 'Liam Harris',
        imageSrc: assets.waiter,
        rating: 4.8,
        activeStatus: true,
    },
    {
        waiterId: '10',
        restaurantId: '3',
        name: 'Ava Martinez',
        imageSrc: assets.waiter,
        rating: 4.1,
        activeStatus: true,
    },
    // Add more waiters as needed
];

export default waitersMockData;

