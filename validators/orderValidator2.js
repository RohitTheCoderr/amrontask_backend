import Joi from "joi"

export const orderValidator2 = Joi.object({
  paymentMode: Joi.string().valid("Cash", "Card", "UPI").required(),
  productsdetails:Joi.array().required(),
//   Quantity: Joi.number().integer().min(1).required(),
//   size: Joi.string().valid("S", "M", "L", "XL", "XXL").required(),
//   productIds: Joi.array().items(Joi.string().length(24)).required(),
  totalAmount: Joi.number().required(),
  date: Joi.date().optional() // optional, default added in schema
});

