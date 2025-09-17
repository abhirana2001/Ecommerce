import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sessionModel = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionModel);

export default Session;
