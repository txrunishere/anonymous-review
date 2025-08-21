import { models, model, Schema, Model } from "mongoose";
import { IReview } from "@/types";

const reviewSchema: Schema<IReview> = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Review =
  (models.Review as Model<IReview>) || model<IReview>("Review", reviewSchema);
