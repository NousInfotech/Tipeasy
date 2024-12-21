import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

// Subschemas
const addressSchema = new mongoose.Schema({
  no: { type: String, required: true },
  street: { type: String, required: true },
  area: { type: String, required: false },
  townCity: { type: String, required: true },
  pinCode: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
});

// Main Schema
const restaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  googleLocation: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  description: { type: String },
  address: addressSchema,
  profileImage: { type: String },
  qrStatus: {
    type: String,
    enum: ['none', 'generated', 'sent'],
    default: 'none',
    required: true
  },
  qrCodeUrl: { type: String },
}, { timestamps: true });

export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
