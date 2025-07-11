import express from "express"
import { deletecartitemcontroller } from "../../controllers/productscontroller.js"
import { verifyToken } from "../../middlewares/jwtmiddleware.js"

const router =express.Router()

router.route("/").post( verifyToken, deletecartitemcontroller)

export {router as deletefromcartroute}