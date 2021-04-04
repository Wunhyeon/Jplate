import express from "express";
import controller from "../controller/user";
const userRouter = express.Router();

userRouter.post("/signup", controller.postUser.signup);
userRouter.post("/signin", controller.postUser.signin);

userRouter.get("/info", controller.getUser.getUserInfo);
userRouter.get("/logout", controller.getUser.logout);
userRouter.get("/getMyProject", controller.getUser.getMyProject);

userRouter.patch("/modifyname", controller.patchUser.modifyUserName);
userRouter.patch("/modifypassword", controller.patchUser.modifyPassword);

export { userRouter };
