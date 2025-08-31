import { models, model, Schema, Model } from "mongoose";
import { IUser } from "@/types";
import { Review } from "./reviews.model";

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export const User =
  (models.User as Model<IUser>) || model<IUser>("User", userSchema);
