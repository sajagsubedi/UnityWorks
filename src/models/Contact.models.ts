import mongoose, { Document, Schema } from "mongoose";

export interface ContactForm extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema<ContactForm> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose?.models?.Contact as mongoose.Model<ContactForm>) ||
  mongoose.model<ContactForm>("Contact", ContactSchema);
