const asyncHandler = require("express-async-handler");
const Order = require("../models/order_model");
const Product = require("../models/product_model");
const Cart = require("../models/cart_model");
//@desc getcart
//@route POST /api/fetch cart
//@access private
const placeOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate({
    path: "products.product",
    model: "product",
  });
  if (!cart) {
    res.status(404);
    throw new Error("No cart Found");
  }
  let totalPrice = 0;
  //   t.product.sellingprice
  for (var t of cart.products) {
    const subTotal = t.quantity * 500;
    totalPrice += subTotal;
  }

  //   Create a new order
  const order = {
    userId: req.user.id,
    products: cart.products,
    total: totalPrice,
  };
  // Save the order
  const newOrder = await Order.create(order);
  // Clear the cart
  await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { $set: { products: [] } }
  );
  res.status(200).json(newOrder);
});
module.exports = { placeOrder };
