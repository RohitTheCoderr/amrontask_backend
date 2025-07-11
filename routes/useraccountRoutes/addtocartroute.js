import express from "express"
import { addprodutcsincartcontroller } from "../../controllers/productscontroller.js"
import { verifyToken } from "../../middlewares/jwtmiddleware.js"

const router =express.Router()

router.route("/").post( verifyToken, addprodutcsincartcontroller)

export {router as addtocartroute}