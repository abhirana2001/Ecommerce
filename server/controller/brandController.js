import asyncHandler from "express-async-handler";
import Brand from "../model/brandModel.js";

export const createBrandController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const findBrand = await Brand.findOne({ name: name.toLowerCase() });

  if (findBrand) {
    throw new Error("Brand already exsist");
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.user.id,
  });

  res.status(201).json({
    status: "Success",
    message: "Brand is created Successfully",
    brand,
  });
});

export const getAllbrandsControllr = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.status(200).json({
    status: "Success",
    message: "Brands are fetched Successfully",
    brands,
  });
});

export const getSingleBrandCotroller = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    message: `Brand ${brand.name} is fetched Successfully`,
    brand,
  });
});

export const updateBrandController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name: name.toLowerCase() },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Brand is updated successfully",
    brand,
  });
});

export const deleteBrandController = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "Success",
    message: "Brand is deleted successfully",
  });
});
