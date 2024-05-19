const asyncHandler = require("express-async-handler");
const Product = require("../models/product_model");
const { array } = require("../middleware/image_upload");
const { Error } = require("mongoose");

//@desc addproduct
//@route POST /api/addproduct
//@access public
const addProduct = asyncHandler(async (req, res) => {
  console.log(req.files);
  const obj = new Product({
    productname: req.body.productname,
    productdescription: req.body.productdescription,
    sellingprice: req.body.sellingprice,
    originalprice: req.body.originalprice,
    productqty: req.body.productqty,
  });

  if (req.files) {
    let path = [];
    for (i in req.files) {
      path.push(req.files[i].path);
      obj.image = path.join();
    }
  }
  const newProduct = await obj.save();
  if (!newProduct) {
    res.status(400);
    throw new Error("not saved ");
  }
  res.status(200).json({ newProduct });
});

//@desc getProducts
//@route POST /api/fetchproducts
//@access public
const getProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const products = await Product.find();
  if (!products) {
    res.status(200).json({ message: "No avaible product" });
  }
 
  res.status(200).json({ products });
});

module.exports = { addProduct, getProduct };
