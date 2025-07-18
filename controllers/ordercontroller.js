import { orderModel } from "../models/orderModel.js";
import { orderModel2 } from "../models/orderModel2.js";
import ProductModel from "../models/ProductModel.js";
import { orderValidator } from "../validators/orderValidator.js";
import { orderValidator2 } from "../validators/orderValidator2.js";

export const placedOrderController = async (req, res, next) => {
  try {
    const userID = req.userID;

    // console.log("req.body while order place", req.body);
    const orderDetail = await orderValidator.validateAsync(req.body);

    // console.log("orderDetail while order place", orderDetail);
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

export const OrdersController = async (req, res, next) => {
  try {
    const userID = req.userID;

    const orderDetail = await orderValidator2.validateAsync(req.body);

    const existingOrder = await orderModel2.findOne({ userID });

    if (!existingOrder) {
      await orderModel2.create({
        userID,
        orderHistory: [orderDetail],
      });

      return res.status(201).json({
        success: true,
        message: "Order placed for the first time.",
      });
    }

    await orderModel2.updateOne(
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

export const getOrdersHistoryController = async (req, res, next) => {
  try {
    const userID = req.userID;

    const userOrder = await orderModel2.findOne({ userID });

    if (!userOrder || userOrder.orderHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No order history found.",
      });
    }

    const orderHistoryWithProductsdetails = await Promise.all(
      userOrder.orderHistory
        .filter((order) => order !== null)   // remove  null order
        .map(async (order) => {
          const productsDetails = order.productsdetails;

          const productIds = productsDetails.map((item) => item.productId);

          const productsFromDB = await ProductModel.find({
            _id: { $in: productIds },
          }).lean();

          // Merge Quantity and size with full product details
          const products = productsDetails.map((item) => {
            const fullProduct = productsFromDB.find(
              (product) => product._id.toString() === item.productId.toString()
            );

            return {
              ...fullProduct,
              Quantity: item.Quantity,
              size: item.size,
            };
          });

          const orderObj = order.toObject();
          delete orderObj.productsdetails; // ✅ remove the raw productsdetails array

          return {
            ...orderObj,
            products,
          };
        })
    );

    return res.status(200).json({
      success: true,
      message: "Order history with products fetched.",
      orderHistory: orderHistoryWithProductsdetails,
    });
  } catch (error) {
    console.log("error occurred while order history", error);
    next(error);
  }
};

export const getOrderHistoryController = async (req, res, next) => {
  try {
    const userID = req.userID;

    const userOrder = await orderModel.findOne({ userID });

    if (!userOrder || userOrder.orderHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No order history found.",
      });
    }

    const orderHistoryWithProducts = await Promise.all(
      userOrder.orderHistory.map(async (order) => {
        const products = await ProductModel.find({
          _id: { $in: order.productIds },
        });

        return {
          ...order.toObject(),
          products, // full product details
        };
      })
    );

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
