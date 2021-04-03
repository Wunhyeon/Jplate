import express from "express";
import controller from "../controller/template";

const templateRouter = express.Router();

templateRouter.get("/getAllTemplate", controller.getTemplate.getAllTemplate);

export { templateRouter };
