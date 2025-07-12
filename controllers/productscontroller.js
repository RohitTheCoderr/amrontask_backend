import usercartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";

export const uploadProductsController = async (req, res, next) => {
  try {
    if (!req.files || !req.body) {
      return res
        .status(401)
        .json({ success: false, message: "No files or details not found!" });
    }
    let images;
    if (Array.isArray(req.files)) {
      images = req.files.map((file) => ({
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      }));
    }

    let details;
    if (typeof req.body === "string") {
      details = JSON.parse(req.body);
    } else {
      details = req.body;
    }

    const product = { images, ...details };
    // const product = await productValidator.validateAsync({ images, ...details });

    await ProductModel.create(product);
    console.log(`Product details saved`);

    res
      .status(200)
      .json({ success: true, message: "Products uploaded.", data: {} });
  } catch (error) {
    console.log("error occurred at uploadproducts controller", error);
    next(error);
  }
};

export const getAllproductscontroller = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});
    res
      .status(200)
      .json({ success: true, message: "fetched all products", data: products });
  } catch (error) {
    console.log("error occurred while fetching productslist", error);
  }
};

export const addprodutcsincartcontroller = async (req, res, next) => {
  try {
    const { productId, Quantity, size } = req?.body;
    const userID = req.userID;

    if (!productId || !Quantity || !size) {
      res.status(502).json({
        success: false,
        message: "please provide productId, size or Quantity",
      });
    }

    const isAvaiableproduct = await ProductModel.findById(productId);
    if (!isAvaiableproduct) {
      return res.status(401).json({
        success: false,
        message: "currently this product is not avaible ",
      });
    }

    const isitemAlreadyincart = await usercartModel.findOne({ userID });

    if (!isitemAlreadyincart) {
      usercartModel.create({
        userID,
        products: [{ productId, Quantity, size }],
      });

      return res
        .status(200)
        .json({ success: true, message: "product added at cart" });
    } else {
      const updatecartitem = await usercartModel.updateOne(
        { userID, "products.productId": productId },
        {
          $inc: { "products.$.Quantity": Quantity },
          $set: { "products.$.size": size },
        }
      );
      if (updatecartitem.matchedCount === 0) {
        await usercartModel.updateOne(
          { userID },
          { $push: { products: { productId, Quantity, size } } }
        );
        return res
          .status(200)
          .json({ success: true, message: "products added at your cart" });
      }

      return res
        .status(200)
        .json({ success: true, message: "your cart products updated" });
    }
  } catch (error) {
    console.log("error occurred at addprocuts at usercart", error);
    next(error);
  }
};

export const allcartproductscontroller = async (req, res, next) => {
  try {
    const userID = req?.userID;
console.log();

    if (!userID) {
      res.status(401).json({ success: false, message: "userId not found" });
    }
    const cartProducts = await usercartModel.findOne({ userID }).lean(); // lean is use for reduce external data from mongoose side
    if (!cartProducts) {
      return res.status(404).json({
        success: false,
        message: "No items found in the cart",
      });
    }


    const cartlistPromises= cartProducts?.products?.map(async (product)=>{
      const singleProduct =await ProductModel.findById(product?.productId).lean();
      return {...singleProduct, Quantity:product?.Quantity, size:product?.size}
    })

    const listofproducts= await Promise.all(cartlistPromises)

    return res.status(200).json({success:true, message:"get all cart products", data:{listofproducts}})
  } catch (error) {
    console.log("error occurred while fetching cart list", error);
  }
};

export const deletecartitemcontroller = async (req, res, next) => {
  try {
    const productId = req?.body?.productId;
    const userID = req.userID;
    if (!productId || !userID) {
      return res.status(501).json({
        success: false,
        message: "please provide productId or userID",
      });
    }

    const deletecartitem = await usercartModel.updateOne(
      { userID },
      { $pull: { products: { productId } } }
    );

    if (deletecartitem.modifiedCount === 0) {
      return res
        .status(401)
        .json({ success: false, message: "products not found in your cart" });
    }
    return res
      .status(200)
      .json({ success: true, message: "cart product deleted successefully" });
  } catch (error) {
    console.log("error occurred while deleting cartitem", error);
    next(error);
  }
};
