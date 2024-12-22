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
    availability: 'available' | 'out-of-stock';
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
    qrCodeUrl?: string;
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
    status: 'pending' | 'ongoing' | 'served';
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
    password?: string;
    restaurantId: string; // Using string as restaurantId is typically passed as a string
    ratings: number;
    firebaseId: string;
    imgSrc?: string;
    bankDetails?: IBankDetails; // Optional, but if provided, it will be required
}

interface IUser {
    _id?: string;
    username: string;
    email: string;
    password?: string;
    phoneNumber: string;
    firebaseId: string;
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


// Exporting the interfaces for use in models or other files
export type {razorpayNotes, IAddress, IDietaryPreference, IMenu, IRestaurant, IOrder, ITipping, IWaiter, IUser, SuccessResponse, ErrorResponse, validateResponse, RazorpayResponse, razorpayHandlerResponse };
