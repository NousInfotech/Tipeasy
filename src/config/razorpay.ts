import Razorpay from "razorpay";


// test keys
const rp_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string;
const rp_secret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET as string;


// Razorpay configuration
const razorpayInstance = new Razorpay({
    key_id: rp_id,
    key_secret: rp_secret,
});

export { rp_secret, rp_id, razorpayInstance };
