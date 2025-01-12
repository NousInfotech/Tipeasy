import mongoose from "mongoose";

// Subschema for Bank Details
const bankDetailsSchema = new mongoose.Schema({
  ifsc: { type: String, required: true },
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  razorpayFundAccountId: { type: String, required: false },
});

// Main Schema
const waiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  ratings: { type: Number, default: 0 },
  firebaseId: { type: String, unique: true },
  imgSrc: { type: String, required: false },
  bankDetails: bankDetailsSchema,
}, { timestamps: true });

export const Waiter = mongoose.models.Waiter || mongoose.model("Waiter", waiterSchema);
