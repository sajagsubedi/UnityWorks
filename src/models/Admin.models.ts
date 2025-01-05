import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";

export interface User extends Document {
  name: String;
  email: String;
  password: String;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string
}

const AdminSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminSchema.methods.comparePassword = async function (password:string) {
  return this.password === password;
};

AdminSchema.methods.generateToken = function () {
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          name: this.name,
      },
      process.env.TOKEN_SECRET || "#unityworks123#",
      {
          expiresIn: process.env.TOKEN_EXPIRY  || "5d",
      }
  );
};

export default (mongoose.models.Admin as mongoose.Model<User>) ||
  mongoose.model<User>("Admin", AdminSchema);
