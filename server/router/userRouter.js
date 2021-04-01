import express from "express";
import controller from "../controller/user";
const userRouter = express.Router();

userRouter.post("/signup", controller.postUser.signup);
userRouter.get("/signin", controller.postUser.signin);

export { userRouter };
