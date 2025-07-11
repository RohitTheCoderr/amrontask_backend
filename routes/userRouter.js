import express from "express"
import { createRoute } from "./useraccountRoutes/createroute.js";
import { loginroute } from "./useraccountRoutes/loginroute.js";
import { addtocartroute } from "./useraccountRoutes/addtocartroute.js";
import { deletefromcartroute } from "./useraccountRoutes/deletefromcartroute.js";

const router = express.Router();

router.use("/create" , createRoute)
router.use("/login" , loginroute)

router.use("/addtocart" , addtocartroute)
router.use("/deletefromcart" , deletefromcartroute)


export default router
