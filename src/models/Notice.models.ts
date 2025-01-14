import mongoose, { Document, Schema } from "mongoose";
import { Visibility, ImageType } from "@/types/ApiTypes";

export interface NoticeItem extends Document {
  title: string;
  images: ImageType[];
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}
export const noticeSchema: Schema<NoticeItem> = new Schema(
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

const Notice =
  (mongoose?.models?.Notice as mongoose.Model<NoticeItem>) ||
  mongoose.model<NoticeItem>("Notice", noticeSchema);
export default Notice;
