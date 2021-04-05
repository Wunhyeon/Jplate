import path, { dirname } from "path";
import fs, { rm } from "fs";
import { editVideo, mergeAudio, mergeVideo } from "./video";
import util from "util";
const exec = util.promisify(require("child_process").exec);

const videoEncoder = "h264";

const makeDir = () => {
  try {
    //Create temp folders
    console.log("Initialize temp files");
    let readDir = fs.readdirSync(__dirname);
    console.log("readDir : ", readDir);
    readDir.forEach((el) => {
      if (el.substr(-6) === "result") {
        // console.log(__dirname + "/" + el);
        fs.rmSync(__dirname + "/" + el, { recursive: true });
      }
    });

    const resultFolder = path.join(__dirname, `${new Date().getTime()}result`);
    const resultNoAudio = path.join(resultFolder, "noAudio");

    if (fs.existsSync(resultFolder)) {
      fs.rmSync(resultFolder, { recursive: true });
      fs.mkdirSync(resultFolder);
    } else {
      fs.mkdirSync(resultFolder);
    }

    if (fs.existsSync(resultNoAudio)) {
      fs.rmSync(resultFolder, { recursive: true });
      fs.mkdirSync(resultNoAudio);
    } else {
      fs.mkdirSync(resultNoAudio);
    }

    return [resultFolder, resultNoAudio];
  } catch (err) {
    console.log("err on make folder : ", err);
  }
};

export const makeVideoCategorized = async (editForm) => {
  let selectedVideoList = [...editForm.selectedVideo];
  let selectedText = [...editForm.selectedText];
  let { templateId } = editForm;
  let { selectedMusic } = editForm;
  let folderList = makeDir();

  let x = 20;
  let y = 20;
  let font_size = 64;

  let category = "";

  if (templateId === "6068a78f1457a0294494acb7") {
    x = 150;
    y = 300;
    font_size = 128;
  }

  if (
    templateId === "6068a5d376b37060d666f098" ||
    templateId === "6068a78f1457a0294494acb7"
  ) {
    category = "normal";
    for (let i = 0; i < editForm.selectedVideo.length; i++) {
      await editVideo(
        selectedVideoList[i],
        selectedText[i],
        i + 1,
        x,
        y,
        font_size,
        folderList,
        category
      );
    }
    await mergeVideo(selectedMusic, folderList);
    return folderList[0];
  } else if (templateId === "6068a8721457a0294494acb8") {
    console.log("insta");
    category = "insta";
    await editVideo(
      selectedVideoList[0],
      selectedText[0],
      0,
      0,
      0,
      64,
      folderList,
      category
    );
    await mergeAudio(selectedMusic, folderList[1], category);
    return folderList[0];
  }
};
