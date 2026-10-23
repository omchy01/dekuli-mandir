import mongoose from "mongoose";

const heroImgSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HeroImg = mongoose.model("HeroImg", heroImgSchema);

export default HeroImg;