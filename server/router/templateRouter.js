import express from "express";
import controller from "../controller/template";

const templateRouter = express.Router();

templateRouter.get("/getAllTemplate", controller.getTemplate.getAllTemplate);
templateRouter.get("/getOneTemplate", controller.getTemplate.getOneTemplate);

templateRouter.post(
  "/purchaseTemplate",
  controller.postTemplate.purchaseTemplate
);

export { templateRouter };
