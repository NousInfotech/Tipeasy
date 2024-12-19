import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  firebaseId: { type: String, required: true, unique: true },
  restaurantId: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    required: true
  },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
