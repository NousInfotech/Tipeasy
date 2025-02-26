// Address Interface
interface IAddress {
    no: string;
    street: string;
    area?: string;
    townCity: string;
    pinCode: string;
    district: string;
    state: string;
    country?: string;
}

// Dietary Preferences Interface
interface IDietaryPreference {
    type: string;
    description?: string;
}

// Menu Interface
interface IMenu {
    _id?: string;
    title: string;
    description?: string;
    imgSrc: string;
    price: number;
    category: string;
    availability: boolean;
    dietaryPreference: string;
    restaurantId: string;  // Changed to string
}


// Restaurant Interface
interface IRestaurant {
    _id?: string;
    title: string;
    googleLocation?: string;
    email?: string;
    phoneNumber: string;
    description?: string;
    address: IAddress;
    profileImage?: string;
    qrStatus: 'none' | 'generated' | 'sent';
    qrCodeUrl?: string | '';
}

// Order Interface
interface IOrder {
    _id?: string;
    menuItems: {
        menuId: string;  // Changed to string
        quantity: number;
    }[];
    restaurantId: string;  // Changed to string
    tableNo: string;
    customerName?: string;
    phoneNumber?: string;
    totalAmount: number;
    dateTime: Date;
    status?: 'pending' | 'ongoing' | 'served';
    notes?: string;
}



// Tipping Interface
interface ITipping {
    _id?: string;
    waiterId: string;  // Changed to string
    restaurantId: string;  // Changed to string
    tipAmount: number;
    rating?: number;
    experience?: 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy' | 'no_experience';
    razorpayPaymentId?: string;
    razorpayFundId?: string;
    comments?: string;
    dateTime?: Date;
}


interface IBankDetails {
    ifsc: string;
    accountName: string;
    accountNumber: string;
    razorpayFundAccountId?: string;
}

// Type for the Waiter Schema
interface IWaiter {
    _id?: string;
    name: string;
    phoneNumber: string;
    email: string;
    confirmPassword?: string;
    password?: string;
    restaurantId: string; // Using string as restaurantId is typically passed as a string
    ratings: number;
    firebaseId?: string;
    imgSrc?: string;
    bankDetails?: IBankDetails; // Optional, but if provided, it will be required
}

interface IUser {
    _id?: string;
    username: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber: string;
    firebaseId?: string;
    restaurantId: string;
    role: "admin" | "superadmin";
}

interface SuccessResponse {
    success: true;
    message: string;
    data?: unknown;
}

interface ErrorResponse {
    success: false;
    message: string;
    code: string;
    status: number;
    details?: unknown; // Optional field for additional error context
}

interface validateResponse {
    success: boolean;
    data: object;
    message: string;
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}


interface razorpayHandlerResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string
}

interface razorpayNotes {
    restaurantId: string,
    waiterId: string,
    tipAmount: string
}

interface TableData {
    [key: string]: string | number;
}

interface IFormattedRestaurantData {
    id: number; // Matches `_id` from the original data
    _id: string;
    title: string;
    qrURL: string;
    qrStatus: string; // Ensure this matches the type of `qrStatus` in the original data
    email: string;
    phone: string; // Ensure this matches the type of `phoneNumber` in the original data
}
interface IFormattedTippingData {
    id: number; // Matches `_id` from the original data
    _id: string;
    waiterId: string;  // Changed to string
    restaurantId: string;  // Changed to string
    tipAmount: number;
    date: string,
    time: string,
}

interface IFormattedChartData {
    amount: number;
    date: string;
    time: string;
}

type Role = 'superadmin' | 'admin';

type RoleChild = RoleSegment[]

interface RoleSegment {
    segment: string;
    title?: string;
    icon?: React.JSX.Element
    children?: RoleChild
}



// Exporting the interfaces for use in models or other files
export type { IFormattedChartData, IFormattedTippingData, Role, RoleChild, RoleSegment, IFormattedRestaurantData, TableData, razorpayNotes, IAddress, IDietaryPreference, IMenu, IRestaurant, IOrder, ITipping, IWaiter, IUser, SuccessResponse, ErrorResponse, validateResponse, RazorpayResponse, razorpayHandlerResponse };
