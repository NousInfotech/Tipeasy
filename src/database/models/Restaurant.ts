import mongoose from "mongoose";

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


const QrStatus = new mongoose.Schema({
  type: 'string',
  enum: ['none', 'generated', 'sent'],
  default: 'none',
  required: 'true'
})

// Main Schema
const restaurantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  googleLocation: { type: String },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  description: { type: String },
  address: addressSchema,
  profileImage: { type: String },
  qrStatus: { type: QrStatus, required: true },
  qrCodeUrl: { type: String },
}, { timestamps: true });


export const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

