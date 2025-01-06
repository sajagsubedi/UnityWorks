import mongoose, { Document, Schema } from "mongoose";

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}
interface Image {
  url: string;
  public_id: string;
}

export interface Notice extends Document {
  title: string;
  images: Image[];
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}
export const noticeSchema: Schema<Notice> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    visibility: {
      type: String,
      required: true,
      enum: Object.values(Visibility),
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Notice as mongoose.Model<Notice>) ||
  mongoose.model<Notice>("Notice", noticeSchema);
