import { userModel } from "../models/userModels.js";
import {createHashedPassword,verifiedhashedpassword,} from "../services/library/bcrypt.js";

export async function createUser(req, res, next) {
  try {
    console.log("request", req.body);
    
    let { firstname, lastname, email, password } = req.body;

    if (!email || !firstname) {
      return res
        .status(400)
        .json({ message: "Firstname and Email are required" });
    }
    let user;
    if (email) {
      user = await userModel.findOne({ email: email });
    }
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist." });
    }

    console.log("beofer password hashed", user);
    console.log("beofer password hashed", req.body);
    
     
    password = await createHashedPassword(password);

    console.log("after hasged", password);
    
    const newUser = new userModel({ firstname, lastname, email, password });
    const savedUser = await newUser.save();

    console.log("newUser", savedUser);
    
    if (newUser._id) {
      req.userID = newUser._id;
      // res
      //   .status(201)
      //   .json({
      //     success: true,
      //     message: `User created successfully.`,
      //     user: savedUser,
      //   });
      return next();
    } else {
      return res
        .status(500)
        .json({ success: false, message: "user not created" });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getUsers(req, res, next) {
  try {
    let { email, password } = req.body;

    if ((!email, !password)) {
      return res
        .status(400)
        .json({ success: false, message: "password and Email are required" });
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
