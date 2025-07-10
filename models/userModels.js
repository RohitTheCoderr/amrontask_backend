import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false},
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
