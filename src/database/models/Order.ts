import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
  quantity: { type: Number, required: true },
  tableNo: { type: String, required: true },
  customerName: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  dateTime: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
});

export const Order = mongoose.model("Order", orderSchema);
