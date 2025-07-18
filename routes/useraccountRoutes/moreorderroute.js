import { Router } from "express";
import { getOrdersHistoryController, OrdersController } from "../../controllers/ordercontroller.js";
import { verifyToken } from "../../middlewares/jwtmiddleware.js";
const router = Router()

router.route("/")
    .all(verifyToken)
    .post(OrdersController)
    .get(getOrdersHistoryController)

    export { router as moreorderRoute }