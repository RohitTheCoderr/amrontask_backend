import mongoose, { Schema, model } from "mongoose";

const orderHistorySchema = new Schema({
  paymentMode: { type: String, required: true },
  Quantity: { type: Number, required: true },
  size: { type: String, required: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const orderSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  orderHistory: [orderHistorySchema],
  // address: addressSchema // Optional if you're including shipping address
}, {
  timestamps: true // adds createdAt and updatedAt
});

export const orderModel = model("Order", orderSchema);
