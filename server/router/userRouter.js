import express from "express";
import controller from "../controller/user";
const userRouter = express.Router();

userRouter.post("/signup", controller.postUser.signup);
userRouter.post("/signin", controller.postUser.signin);

userRouter.get("/info", controller.getUser.getUserInfo);

export { userRouter };
