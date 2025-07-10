import express from "express"
import { getUsers } from "../../controllers/userController.js"
import { createToken } from "../../middlewares/jwtmiddleware.js"

const router =express.Router()

router.route("/").post(getUsers, createToken)

export {router as loginroute}