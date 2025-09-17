import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      recuired: true,
    },
    images: {
      type: String,
      default: "https://picsum.photos/200/300",
      requred: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
