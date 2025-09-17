import asyncHandler from "express-async-handler";
import Color from "../model/colorModel.js";

export const createColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const findColor = await Color.findOne({ name });

  if (findColor) {
    throw new Error("Color lready exsist");
  }

  const color = await Color.create({
    name: name.toLowerCase(),
    user: req?.user?.id,
  });

  res.status(201).json({
    status: "Success",
    message: "Color is created successfully",
    color,
  });
});
export const getAllColorController = asyncHandler(async (req, res) => {
  const colors = await Color.find();

  res.status(201).json({
    status: "Success",
    message: "Colors are fetched  successfully",
    colors,
  });
});

export const getSingleColorController = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    message: "Color is fetched  successfully",
    color,
  });
});

export const updateColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const color = await Color.findByIdAndUpdate(
    req.params.id,
    { name: name.toLowerCase() },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: "Color is updated  successfully",
    color,
  });
});

export const deleteColorController = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "Color is deleted  successfully",
  });
});
