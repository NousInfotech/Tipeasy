import { Waiter } from "@/types";
import assets from "../../public/assets/assets";

const waitersMockData: Waiter[] = [
    {
        waiterId: '1',
        restaurantId: '3', // value of 3 for restaurantId
        name: 'John Doe',
        imgSrc: assets.waiter,
        rating: 4.5,
        activeStatus: true,
    },
    {
        waiterId: '2',
        restaurantId: '3',
        name: 'Jane Smith',
        imgSrc: assets.waiter,
        rating: 3.8,
        activeStatus: true,
    },
    {
        waiterId: '3',
        restaurantId: '3',
        name: 'Alex Johnson',
        imgSrc: assets.waiter,
        rating: 4.7,
        activeStatus: true,
    },
    {
        waiterId: '4',
        restaurantId: '3',
        name: 'Emily Davis',
        imgSrc: assets.waiter,
        rating: 4.0,
        activeStatus: true,
    },
    {
        waiterId: '5',
        restaurantId: '3',
        name: 'Michael Brown',
        imgSrc: assets.waiter,
        rating: 4.3,
        activeStatus: true,
    },
    {
        waiterId: '6',
        restaurantId: '3',
        name: 'Sophia Lee',
        imgSrc: assets.waiter,
        rating: 4.6,
        activeStatus: true,
    },
    {
        waiterId: '7',
        restaurantId: '3',
        name: 'David Wilson',
        imgSrc: assets.waiter,
        rating: 3.9,
        activeStatus: true,
    },
    {
        waiterId: '8',
        restaurantId: '3',
        name: 'Olivia Taylor',
        imgSrc: assets.waiter,
        rating: 4.2,
        activeStatus: true,
    },
    {
        waiterId: '9',
        restaurantId: '3',
        name: 'Liam Harris',
        imgSrc: assets.waiter,
        rating: 4.8,
        activeStatus: true,
    },
    {
        waiterId: '10',
        restaurantId: '3',
        name: 'Ava Martinez',
        imgSrc: assets.waiter,
        rating: 4.1,
        activeStatus: true,
    },
    // Add more waiters as needed
];

export default waitersMockData;

