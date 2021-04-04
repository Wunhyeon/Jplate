import Musics from "../../models/musicModel";

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
};
