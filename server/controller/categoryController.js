import asyncHandler from "express-async-handler";
import Category from "../model/categoryModel.js";

export const createCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const findCategory = await Category.findOne({ name });

  if (findCategory) {
    throw new Error("Category already exsist");
  }

  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.user.id,
  });

  res.status(201).json({
    status: "Success",
    message: "Category is created successfully",
    category,
  });
});

export const getAllCategorycontroller = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "Success",
    message: "Categories are fetched successfully",
    categories,
  });
});

export const getSingleCategoryController = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    message: "Category is fetched successfully",
    category,
  });
});

export const updateCategoryController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: name.toLowerCase() },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Category is updated successfully",
    category,
  });
});

export const deleteCategoryController = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "Success",
    message: "Category is deleted successfully",
  });
});
