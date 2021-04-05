import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  Title: String,
  URL: String,
});

const Videos = mongoose.model("Videos", videoSchema);

export default Videos;
