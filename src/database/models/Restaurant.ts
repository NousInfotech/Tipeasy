import mongoose from "mongoose";

// Subschemas
const addressSchema = new mongoose.Schema({
  no: { type: String, required: true },
  street: { type: String, required: true },
  area: { type: String, required: false },
  townCity: { type: String, required: true },
  pinCode: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, default: "Telangana" },
  country: { type: String, default: "India" },
});

const dietaryPreferencesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: false },
});

// Main Schema
const restaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  waiters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Waiter" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  categories: [{ type: String }],
  dietaryPreferences: { type: [dietaryPreferencesSchema], default: [] },
  googleLocation: { type: String },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  description: { type: String },
  address: addressSchema,
  profileImage: { type: String },
  qrCodeUrl: { type: String },
  tippings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tipping" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
