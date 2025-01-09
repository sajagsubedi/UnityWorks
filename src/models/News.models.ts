import mongoose, { Document, Schema } from "mongoose";
import { Visibility } from "@/types/ApiTypes";

export interface NewsItem extends Document {
  title: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  visibility: Visibility;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema<NewsItem> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
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

const News = mongoose.models?.News || mongoose.model<NewsItem>("News", newsSchema);
export default News;
