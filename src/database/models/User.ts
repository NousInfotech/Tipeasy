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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
