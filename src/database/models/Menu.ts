import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  imgSrc: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  availability: { type: String, enum: ["available", "out-of-stock"], required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
});

export const Menu = mongoose.model("Menu", menuSchema);
