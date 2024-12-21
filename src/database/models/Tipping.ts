import mongoose from "mongoose";

const tippingSchema = new mongoose.Schema({
  waiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Waiter", required: true }, // Reference to the waiter receiving the tip
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true }, // Reference to the restaurant
  tipAmount: { type: Number, required: true }, // Tip amount provided
  rating: { type: Number, min: 1, max: 5 }, // Customer's rating for the waiter
  experience: {
    type: String,
    enum: ["very_sad", "sad", "neutral", "happy", "very_happy"], // Emoji-like experience options
  }, // Customer's emoji-based experience
  razorpayPaymentId: { type: String }, // Payment ID from Razorpay
  razorpayFundId: { type: String }, // Fund transaction ID from Razorpay
  comments: { type: String },// review from the customers 
  dateTime: { type: Date, default: Date.now }, // Time of tipping
});

export const Tipping = mongoose.models.Tipping || mongoose.model("Tipping", tippingSchema);
