import mongoose, { Schema, model } from "mongoose";

const ordersHistorySchema = new Schema({
  paymentMode: { type: String, required: true },
  productsdetails: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true,},
      Quantity: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const ordersSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderHistory: [ordersHistorySchema],
    // address: addressSchema // Optional if you're including shipping address
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const orderModel2 = model("moreOrder", ordersSchema);
