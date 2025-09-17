import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import Review from "../model/reviewModel.js";

export const createReviewController = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { product, message, rating } = req.body;

  //find product exsist

  const findProduct = await Product.findById(productId).populate("reviews");

  if (!findProduct) {
    throw new Error("Product not fount . pleace create one");
  }

  // check if user already reviewed this product
  const hasViewed = findProduct.reviews.find((review) => {
    return review?.user.toString() === req?.user?.id.toString();
  });

  if (hasViewed) {
    throw new Error("you already reviewd this product");
  }

  // create review

  const review = await Review.create({
    message,
    rating,
    user: req.user.id,
    product: findProduct?.id,
  });

  // add review to product
  findProduct?.reviews.push(review?._id);
  await findProduct.save();

  res.status(201).json({
    success: "true",
    message: "review is cereatd successfully",
    review,
  });
});
