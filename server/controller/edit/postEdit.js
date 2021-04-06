import { makeVideoCategorized } from "../../util/video/makeVideoCategorize";
import { editVideo, mergeAudio, mergeVideo } from "../../util/video/video";

export const postEdit = {
  makeVideo: async (req, res) => {
    console.log("makeVideo!!");
    console.log(req.body);

    let selectedVideoList = [...req.body.editForm.selectedVideo];
    let selectedText = [...req.body.editForm.selectedText];
    let { templateId } = req.body.editForm;
    let { selectedMusic } = req.body.editForm;
    console.log("templateId : ", templateId);
    console.log("videoList : ", selectedVideoList);
    console.log("textList : ", selectedText);
    console.log("selectedMusic : ", selectedMusic);
    try {
      let filePath = await makeVideoCategorized(req.body.editForm);
      console.log("filePath : ", filePath);
      setTimeout(() => {
        res.download(filePath + "/finalOUTPUT.mp4");
      }, 35000);
      // res.download(filePath + "/finalOUTPUT.mp4");
    } catch (err) {
      console.log("err in makeVideo : ", err);
      res.status(500).send("server Error");
    }
  },
};
