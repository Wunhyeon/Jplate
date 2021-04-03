import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  ThumbnailPicture: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  SampleVideo: {
    type: String,
    required: true,
  },
  Ratio: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  TextLength: {
    //동영상에 글자 들어가는 부분 몇개인지
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Tag: {
    type: String,
    required: true,
  },
  Pages: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Description: String,
});

const Templates = mongoose.model("Templates", templateSchema);

export default Templates;
