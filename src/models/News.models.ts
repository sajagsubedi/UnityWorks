import mongoose, { Document, Schema } from "mongoose";

export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

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

export const newsSchema: Schema<NewsItem> = new Schema({
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
},{
  timestamps: true
});

export default (mongoose.models.News as mongoose.Model<NewsItem>) ||
  mongoose.model<NewsItem>("News", newsSchema);
