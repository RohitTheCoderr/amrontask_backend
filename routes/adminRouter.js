import express from "express"
import { productsRoute } from "./productsRouters/produtsupload.js";

const router = express.Router();

router.use("/upload", productsRoute)
export default router
