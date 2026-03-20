import express from "express"
import { clearCartAfterOrderController } from "../../controllers/productscontroller.js"
import { verifyToken } from "../../middlewares/jwtmiddleware.js"

const router =express.Router()

router.route("/").post( verifyToken, clearCartAfterOrderController)

export {router as clearcartroute}