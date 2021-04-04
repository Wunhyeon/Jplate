import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  Title: String,
  URL: String,
});

const Musics = mongoose.model("Musics", musicSchema);

export default Musics;
