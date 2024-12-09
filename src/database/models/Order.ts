import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  menuItems: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true }, // Reference to the menu item
      quantity: { type: Number, required: true }, // Quantity of the specific menu item
    },
  ],
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },// Refrence to restaurantId
  tableNo: { type: String, required: true }, // Table number for the order
  customerName: { type: String, required: false }, // Optional customer name
  phoneNumber: { type: String, required: false }, // Optional phone number
  totalAmount: { type: Number, required: true }, // Total calculated amount for the order
  dateTime: { type: Date, default: Date.now }, // Time when the order was placed
  status: {
    type: String,
    enum: ["pending", "ongoing", "served"],
    default: "pending"
  }, // Order status
  notes: { type: String, required: false }, // Optional special instructions or notes
});

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

