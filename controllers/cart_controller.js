const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart_model");
const Product = require("../models/product_model");

//@desc addtocart
//@route POST /api/addtocart/id
//@access private
const addToCart = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  const cart = await Cart.findOne({ userId: req.user.id });
  const item = await Product.findById(req.body.productId);

  if (!item) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (!cart) {
    const newCart = Cart({
      userId: req.user.id,
      products: {
        product: req.body.productId,
        quantity: req.body.quantity,
      },
    });
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }
  if (cart) {
    const avalable =   cart.products.some((product) =>
      product.product.equals(req.body.productId));
   if(!avalable){
    cart.products.push({
      product: req.body.productId,
      quantity: req.body.quantity,
    });
    cart.save();
    res.status(200).json('Item added to cart');
   }else{
    res.status(403);
    throw new Error('Product already exist');
   }

    
  }
});

//@desc getcart
//@route POST /api/fetch cart
//@access private
const getCart = asyncHandler(async (req, res) => {
  const allcart = await Cart.findOne({ userId: req.user.id }).populate({
    path: "products.product",
    model: "product",
  });

  res.status(200).json(allcart);
});

//@desc removeFromCart
//@route POST /api/removeFromCart/id
//@access private
const removeCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not Found");
  }
  const avalable = cart.products.some((product) =>
    product.product.equals(req.params.id)
  );
  if (avalable) {
    const result = await Cart.updateOne(
      { userId: req.user.id },
      { $pull: { products: { product: req.params.id } } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json("Item removed from cart");
    }
  } else {
    res.status(404);
    throw new Error("Product not found ");
  }
});

const UpdateCart = asyncHandler(async (req, res) => {
  console.log(req.body);
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not Found");
  }
  const avalable =   cart.products.some((product) =>
    product.product.equals(req.body.productId));
  if (avalable) {
    await Cart.updateOne(
      {
        userId: req.user.id,
        products: { $elemMatch: { product: req.body.productId } },
      },
      { $set: { "products.$.quantity": req.body.quantity } }
    );
    res.status(200).json("Cart Updated");
  } else {
    res.status(404);
    throw new Error("Product not found ");
  }
});

module.exports = { getCart, removeCart, UpdateCart, addToCart };
