import { orderModel } from "../models/orderModel.js";
import ProductModel from "../models/ProductModel.js";
import { orderValidator } from "../validators/orderValidator.js";

export const placedOrderController = async (req, res, next) => {
  try {
    const userID = req.userID; 

    console.log("req.body while order place", req.body);
    const orderDetail = await orderValidator.validateAsync(req.body);
    
    console.log("orderDetail while order place", orderDetail);
    const existingOrder = await orderModel.findOne({ userID });

    if (!existingOrder) {
      await orderModel.create({
        userID,
        orderHistory: [orderDetail],
      });

      return res.status(201).json({
        success: true,
        message: "Order placed for the first time.",
      });
    }

    await orderModel.updateOne(
      { userID },
      { $push: { orderHistory: orderDetail } }
    );

    return res.status(200).json({
      success: true,
      message: "Order placed successfully.",
    });

  } catch (error) {
  console.log("error occurred while orderplace", error);
    next(error);
  }
};


export const getOrderHistoryController = async (req, res, next) => {
  try {
    const userID = req.userID;

    console.log("hello userID", userID);
    
    const userOrder = await orderModel.findOne({ userID });
    console.log("userOrder", userOrder);

    if (!userOrder || userOrder.orderHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No order history found.",
      });
    }

    const orderHistoryWithProducts = await Promise.all(
      userOrder.orderHistory.map(async (order) => {
        const products = await ProductModel.find({
          _id: { $in: order.productIds }
        });

        return {
          ...order.toObject(),
          products // full product details
        };
      })
    );

    console.log("lastressnse",orderHistoryWithProducts);
    
    return res.status(200).json({
      success: true,
      message: "Order history with products fetched.",
      orderHistory: orderHistoryWithProducts,
    });

  } catch (error) {
    console.log("error occurred while order history", error);
    next(error);
  }
};



// export const getOrderHistoryController = async (req, res, next) => {

//   try {
//     const userID = req.userID;

//     const userOrder = await orderModel.findOne({ userID });

//     if (!userOrder || userOrder.orderHistory.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No order history found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Order history retrieved successfully.",
//       orderHistory: userOrder.orderHistory,
//     });
//   } catch (error) {
//    console.log("error occurred while order history", error);
//     next(error);
//   }
// };