import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "review must belong to a project"],
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a raating from 1 to 5"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewModel);

export default Review;
