import express from "express"
import { createRoute } from "./useraccountRoutes/createroute.js";
import { loginroute } from "./useraccountRoutes/loginroute.js";
import { addtocartroute } from "./useraccountRoutes/addtocartroute.js";
import { deletefromcartroute } from "./useraccountRoutes/deletefromcartroute.js";
import { getuserCartlistroute } from "./useraccountRoutes/getuserCartlistroute.js";
import { orderRoute } from "./useraccountRoutes/placeorderroute.js";
import { moreorderRoute } from "./useraccountRoutes/moreorderroute.js";
import { clearcartroute } from "./useraccountRoutes/clearcartroute.js";

const router = express.Router();

router.use("/create" , createRoute)
router.use("/login" , loginroute)

router.use("/addtocart" , addtocartroute)
router.use("/getusercartlist" , getuserCartlistroute)
router.use("/deletefromcart" , deletefromcartroute)
router.use("/clearcart" , clearcartroute)

router.use("/order" ,orderRoute  )
router.use("/moreorder" ,moreorderRoute  )

export default router
