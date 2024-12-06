import Razorpay from "razorpay";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Razorpay configuration
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export default razorpayInstance;
