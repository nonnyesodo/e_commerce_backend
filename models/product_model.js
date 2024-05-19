const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    image: {
      type: [String],
      required: [true, "please add the productname"],
    },
    productname: {
      type: String,
      required: [true, "please add the productname"],
    },
    productdescription: {
      type: String,
      required: [true, "please add the productdescription"],
    },
    sellingprice: {
      type: String,
      required: [true, "please add the sellingprice"],
    },
    originalprice: {
      type: String,
      required: [true, "please add originalprice"],
    },

    productqty: {
      type: String,
      required: [true, "please add the productQty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
