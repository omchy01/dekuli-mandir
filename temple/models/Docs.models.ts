import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const DocsSchema = new Schema(
  {
    eventName: { type: String, required: true, unique: true, lowercase: true },
    eventDate: { type: Date, default: null },
    description: { type: String, required: true, lowercase: true },
    PDF: { type: String, required: true },
    publicId: { type: String },
    originalFilename: { type: String },
  },
  { timestamps: true }
);

export type DocsType = InferSchemaType<typeof DocsSchema>;

export const Docs: Model<DocsType> =
  mongoose.models.Docs || mongoose.model<DocsType>("Docs", DocsSchema);