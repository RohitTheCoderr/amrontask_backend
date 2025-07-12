import express from "express"
import { addprodutcsincartcontroller, allcartproductscontroller } from "../../controllers/productscontroller.js"
import { verifyToken } from "../../middlewares/jwtmiddleware.js"

const router =express.Router()

router.route("/").get( verifyToken, allcartproductscontroller)

export {router as getuserCartlistroute}