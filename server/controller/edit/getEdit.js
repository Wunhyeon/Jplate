import Musics from "../../models/musicModel";
import Videos from "../../models/videoModel";

export const getEdit = {
  getMusic: async (req, res) => {
    console.log("getMusic!");
    try {
      let musicList = await Musics.find();
      res.send({ message: "ok", musicList });
    } catch (err) {
      res.status(500).send({ message: "Server Error" });
    }
  },
  getVideos: async (req, res) => {
    console.log("getVideos!");
    try {
      let videoList = await Videos.find();
      res.send({ message: "ok", videoList });
    } catch (err) {
      res.status(500).send({ message: "Server Error" });
    }
  },
};
