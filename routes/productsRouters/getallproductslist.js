import express from "express";
import { getAllproductscontroller } from "../../controllers/productscontroller.js";

const router = express.Router();
router.route("/").get(getAllproductscontroller)

export { router as getAllProduct };
