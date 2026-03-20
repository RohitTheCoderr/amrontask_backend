import { userModel } from "../models/userModels.js";
import {createHashedPassword,verifiedhashedpassword,} from "../services/library/bcrypt.js";

export async function createUser(req, res, next) {
  try {
    let { firstname, lastname, email, password } = req.body;

    if (!email || !firstname || !password) {
      return res
        .status(400)
        .json({ message: "Firstname, Email and Password are required"});
    }
    let user;
    if (email) {
      user = await userModel.findOne({ email: email });
    }

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist." });
    }
    password = await createHashedPassword(password);
    const newUser = new userModel({ firstname, lastname, email, password });
    const savedUser = await newUser.save();

    if (savedUser._id) {
      req.userID = savedUser._id;
      return next();
    } else {
      return res
        .status(500)
        .json({ success: false, message: "User not created" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getUsers(req, res, next) {
  try {
    let { email, password } = req.body;

    if ((!email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "Password and Email are required" });
    }
    let user;
    if (email) {
      user = await userModel.findOne({ email: email }).select({ password: 1 });
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }

    const verifiedpass = await verifiedhashedpassword(password, user.password);

    if (user && verifiedpass) {
      req.userID = user._id;
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "wrong password!", data: {} });
    }
  } catch (error) {
    next(error);
  }
}
