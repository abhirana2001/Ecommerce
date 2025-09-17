import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import { json } from "express";
import Category from "../model/categoryModel.js";
import Brand from "../model/brandModel.js";

//create product
export const createProductController = asyncHandler(async (req, res) => {
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;

  const productExsist = await Product.findOne({ name });

  if (productExsist) {
    throw new Error("product already exsist");
  }

  const categoryExsist = await Category.findOne({ name: category });
  if (!categoryExsist) {
    throw new Error(
      "Category not found , please create category first or check category name"
    );
  }

  const brandExsist = await Brand.findOne({ name: brand });

  if (!brandExsist) {
    throw new Error(
      "Brand not found , please create brand first or check brand name"
    );
  }

  const product = await Product.create({
    name,
    user: req.user.id,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
  });

  // add product to category
  categoryExsist.products.push(product._id);
  categoryExsist.save();

  //add product to brand
  brandExsist.products.push(product._id);
  brandExsist.save();

  res.status(201).json({
    status: "success",
    message: "product created successfylly",
    product,
  });
});

// get All products and filtes

export const getProductsController = asyncHandler(async (req, res) => {
  //querry object
  let productQuery = Product.find();

  // filter on name

  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  //filter on brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  //filter on category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  //filter on sizes
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: "i" },
    });
  }

  //filter on colors
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }

  //filter on price
  if (req.query.price) {
    let priceStr = JSON.stringify(req.query);
    priceStr = JSON.parse(
      priceStr.replace(/\b(lt|gt|lte|gte)\b/g, (match) => `$${match}`)
    );

    productQuery = productQuery.find(priceStr);
  }

  // pagination

  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;

  let skip = (page - 1) * limit;

  if (req.query.page) {
    let totalProduct = await Product.countDocuments(productQuery);
    console.log(totalProduct);

    if (skip >= totalProduct) {
      throw new Error("Page Not Found");
    }
  }
  productQuery = productQuery.skip(skip).limit(limit);

  const products = await productQuery;

  res.status(200).json({
    status: "success",
    products,
  });
});

// get single product

export const getSingleProductController = asyncHandler(async (req, res) => {
  let productId = req.params.id;

  //find product by id

  let product = await Product.findById(productId).select("-__v");

  if (!product) {
    res.status(401);
    throw new Error("Product Not Found");
  }

  res.status(200).json({
    status: "success",
    message: "Product Fetched Successfully",
    product,
  });
});

// update product

export const updateProductController = asyncHandler(async (req, res) => {
  // get fileds for update
  const { name, description, brand, category, sizes, colors, price, totalQty } =
    req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      price,
      totalQty,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Product Is Updated Successfully",
    product,
  });
});

export const deleteProductController = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Product Is deleted Successfully",
  });
});
