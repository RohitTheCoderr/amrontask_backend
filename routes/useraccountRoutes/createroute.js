import express from "express"
import { createUser } from "../../controllers/userController.js"
import { createToken } from "../../middlewares/jwtmiddleware.js"

const router=express.Router()

router.route("/").post(createUser, createToken)

export { router as createRoute };