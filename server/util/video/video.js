import Jimp from "jimp";
import fs, { rm } from "fs";
import pathToffmpeg from "ffmpeg-static";
import fluentFfmpeg from "fluent-ffmpeg";
import util from "util";
import path, { dirname } from "path";
import { exec } from "child_process";

const AsyncExec = util.promisify(exec);
// const exec = util.promisify(require("child_process").exec);

const videoEncoder = "h264";

// const tempFolder = path.join(__dirname, `${new Date().getTime()}temp`);
// const inputFolder = path.join(tempFolder, "raw-frames");
// const outputFolder = path.join(tempFolder, "edited-frames");

// const resultFolder = path.join(__dirname, `${new Date().getTime()}result`);
// const resultNoAudio = path.join(resultFolder, "noAudio");

export const editVideo = async (
  URL,
  text,
  numbering,
  x,
  y,
  font_size,
  folderList,
  category
) => {
  console.log("editVideo");
  console.log("numbering : ", numbering);

  const resultFolder = folderList[0];
  const resultNoAudio = folderList[1];

  const tempFolder = path.join(__dirname, `${new Date().getTime()}temp`);
  const inputFolder = path.join(tempFolder, "raw-frames");
  const outputFolder = path.join(tempFolder, "edited-frames");

  if (fs.existsSync(tempFolder)) {
    fs.rmSync(tempFolder, { recursive: true });
    fs.mkdirSync(tempFolder);
  } else {
    fs.mkdirSync(tempFolder);
  }

  if (fs.existsSync(inputFolder)) {
    fs.rmSync(inputFolder, { recursive: true });
    fs.mkdirSync(inputFolder);
  } else {
    fs.mkdirSync(inputFolder);
  }

  if (fs.existsSync(outputFolder)) {
    fs.rmSync(outputFolder, { recursive: true });
    fs.mkdirSync(outputFolder);
  } else {
    fs.mkdirSync(outputFolder);
  }

  try {
    //Decode MP4 video and resize
    console.log("Decoding");
    // await exec(
    await AsyncExec(
      `"${pathToffmpeg}" -i ${URL} -vf scale=1080:-1 ${inputFolder}/%d.png`
    );

    //Edit each frame
    console.log("Rendering");
    const frames = fs.readdirSync(inputFolder);
    // console.log("Frames : ", frames);
    for (let frameCount = 1; frameCount <= frames.length; frameCount++) {
      //Check and log progress

      //Read the current frame
      let frame = await Jimp.read(`${inputFolder}/${frameCount}.png`);

      //Modify frame
      frame = await modifyFrame(frame, text, x, y, font_size, category);

      //Save the frame
      await frame.writeAsync(`${outputFolder}/${frameCount}.png`);
    }

    //Encode video from PNG frames to MP4(no audio)
    console.log("Encoding");
    if (fs.existsSync(resultNoAudio + `/OUTPUT${numbering}.mp4`)) {
      fs.rmSync(resultNoAudio + `/OUTPUT${numbering}.mp4`);
    }
    // await exec(
    await AsyncExec(
      `"${pathToffmpeg}" -start_number 1 -i ${outputFolder}/%d.png -vcodec ${videoEncoder} -pix_fmt yuv420p ${resultNoAudio}/'OUTPUT${numbering}.mp4'`
    );

    //Remove temp folder
    console.log("Remove temp folder");
    fs.rmSync(tempFolder, { recursive: true });
  } catch (err) {
    console.log("Err in editVideo : ", err);

    console.log("Remove temp folder");
    fs.rmSync(tempFolder, { recursive: true });
  }
};

const modifyFrame = async (frame, text, x, y, font_size, category) => {
  if (category !== "insta") {
    const newImage = frame;
    let font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    if (font_size === 128) {
      font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    } else if (font_size === 32) {
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    }

    newImage.print(font, x, y, text);
    return newImage;
  } else if (category === "insta") {
    let newHeight = (16 * frame.bitmap.width) / 9;
    newHeight = newHeight % 2 === 0 ? newHeight : newHeight + 1;
    const newImage = new Jimp(frame.bitmap.width, newHeight, "white");
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    newImage.print(font, 20, newImage.bitmap.height - 100, text);
    newImage.composite(frame, 0, newHeight / 2 - frame.bitmap.height / 2);

    return newImage;
  }
};

export const mergeVideo = async (musicURL, folderList) => {
  console.log("mergeVideo!!");
  const resultFolder = folderList[0];
  const resultNoAudio = folderList[1];
  try {
    if (!fs.existsSync(resultFolder + "/merged")) {
      fs.mkdirSync(resultFolder + "/merged");
    }
    fluentFfmpeg(resultNoAudio + "/OUTPUT1.mp4")
      .input(resultNoAudio + "/OUTPUT2.mp4")
      .input(resultNoAudio + "/OUTPUT3.mp4")
      .on("error", (err) => {
        console.log("Error on mergedVideo : ", err);
      })
      .on("end", () => {
        console.log("Merging finished!");
        fs.rmSync(resultNoAudio, { recursive: true });
      })
      .mergeToFile(resultFolder + "/merged/merged.mp4")
      .on("end", () => {
        mergeAudio(musicURL, resultFolder);
      });
  } catch (err) {
    console.log("Err on mergeVideo : ", err);
  }
};

export const mergeAudio = async (musicURL, resultFolder, category) => {
  console.log("mergeAudio!!");
  try {
    if (category === "insta") {
      // let a = await exec(
      let a = await AsyncExec(
        `"${pathToffmpeg}" -i ${resultFolder}/OUTPUT0.mp4 -i ${musicURL} -shortest -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${resultFolder}/../finalOUTPUT.mp4`
      );
      console.log("merge Complete!");
      return;
    } else {
      // let a = await exec(
      let a = await AsyncExec(
        `"${pathToffmpeg}" -i ${resultFolder}/merged/merged.mp4 -i ${musicURL} -shortest -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${resultFolder}/finalOUTPUT.mp4`
      );
      console.log("merge Complete!");
      // console.log("**a** : ", a);
      return;
    }
  } catch (err) {
    console.log("err in merging Audio : ", err);
  }
};
