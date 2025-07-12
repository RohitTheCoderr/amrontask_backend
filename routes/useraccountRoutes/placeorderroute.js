import { Router } from "express";
import { verifyToken } from "../../middlewares/jwtmiddleware.js";
import { getOrderHistoryController, placedOrderController } from "../../controllers/ordercontroller.js";
const router = Router()

router.route("/")
    .all(verifyToken)
    .post(placedOrderController)
    .get(getOrderHistoryController)

    export { router as orderRoute }