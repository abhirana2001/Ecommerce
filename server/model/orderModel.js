import mongoose from "mongoose";

const Schema = mongoose.Schema;

// function to generate order no.
const generateOrderNumber = () => {
  let date = new Date();
  //date
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let currentDate = `${year}${month}${day}`;
  //time
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");
  let currentTime = `${hours}${minutes}${seconds}`;

  let randomNumber = Math.random()
    .toString(36)
    .substring(7)
    .toLocaleUpperCase();

  return `ORD-${currentDate}${currentTime}${randomNumber}`;
};

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItem: {
      type: Object,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      default: generateOrderNumber(),
    },
    // for stripe payment
    paymemtStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
