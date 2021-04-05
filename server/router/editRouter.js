import express from "express";
import controller from "../controller/edit";

const editRouter = express.Router();

editRouter.get("/getMusicList", controller.getEdit.getMusic);
editRouter.get("/getVideoList", controller.getEdit.getVideos);

export { editRouter };
