import express from "express";
const router = express.Router();
import user from "../controllers/user.js";
import { decode } from "../middlewares/jwt.js";

router
    .post("/register", user.registerNewUser)
    .post("/login", user.loginUser)
    .get("/profile", decode, user.getUserDetails)
    .put("/profile", decode, user.updateUserDetails)

export default router;