import mongoose from "mongoose"

const usercartSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  products: [{ productId: { type: String, required: true, unique: true }, Quantity: { type: Number, required: true },  size: { type: String, required: true } }]
})

const usercartModel = mongoose.models.userCart || mongoose.model('userCart', usercartSchema);
export default usercartModel;