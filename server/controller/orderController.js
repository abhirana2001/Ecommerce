import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";

export const createOrderController = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  // find user
  const findUser = await User.findById(req.user.id);

  //check shipping Address

  if (!findUser?.hasShippingAddress) {
    throw new Error("Please provide shipping address");
  }

  // check order is empty or not
  if (!orderItems || orderItems?.length <= 0) {
    throw new Error("There is no order");
  }

  // create order
  const order = await Order.create({
    user: findUser?.id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  // update the product qty

  const products = await Product.find({ _id: { $in: orderItems } });

  await Promise.all(
    orderItems?.map(async (order) => {
      const product = products?.find((p) => {
        return p?._id.toString() === order?._id.toString();
      });

      if (product) {
        product.totalSold += order?.qty;
        product.qtyLeft -= order?.qty;
      }

      await product.save();
    })
  );

  // push order id to user
  findUser?.order?.push(order?.id);
  await findUser.save();

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
    findUser,
  });
});
