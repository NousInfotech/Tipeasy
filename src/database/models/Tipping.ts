import mongoose from "mongoose";

const tippingSchema = new mongoose.Schema({
  waiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Waiter", required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  amount: { type: Number, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  dateTime: { type: Date, default: Date.now },
});

export const Tipping = mongoose.model("Tipping", tippingSchema);
