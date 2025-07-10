import express from "express"
import { createRoute } from "./useraccountRoutes/createroute.js";
import { loginroute } from "./useraccountRoutes/loginroute.js";

const router = express.Router();

router.use("/create" , createRoute)
router.use("/login" , loginroute)

export default router
