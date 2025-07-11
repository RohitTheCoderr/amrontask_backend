import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  images: [
    {
      data: String,          // base64 or URL
      contentType: String    // e.g., "image/jpeg"
    }
  ],
  productName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  size: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default ProductModel;
