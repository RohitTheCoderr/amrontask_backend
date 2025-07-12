import express from "express"
import { getAllProduct } from "./productsRouters/getallproductslist.js";

const router = express.Router();

router.use("/getallproducts", getAllProduct)
export default router
