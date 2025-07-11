import express from "express";
import { uploadProductsController } from "../../controllers/productscontroller.js";
import { upload } from "../../services/library/multer.js";


const router = express.Router();
router.route("/")
    .post(upload.array("images"), uploadProductsController)

export { router as productsRoute };
