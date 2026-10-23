import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const ImgSchema = new Schema(
  {
    imgUrl: { type: String, required: true },
    publicId: { type: String },
  },
  { timestamps: true }
);

export type ImgType = InferSchemaType<typeof ImgSchema>;

export const Img: Model<ImgType> =
  mongoose.models.Img || mongoose.model<ImgType>("Img", ImgSchema);