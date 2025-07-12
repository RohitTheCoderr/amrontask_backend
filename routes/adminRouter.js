import express from "express"
import { productsRoute } from "./productsRouters/produtsupload.js";
// import { getAllProduct } from "./productsRouters/getallproductslist.js";

const router = express.Router();

router.use("/upload", productsRoute)
// router.use("/getallproducts", getAllProduct)
export default router
