const expres = require("express");
const router = expres.Router();
const {
  getCart,
  removeCart,
  UpdateCart,
  addToCart,
} = require("../controllers/cart_controller");
const validateToken = require("../middleware/vaidate_bearer");
router.use(validateToken);
router.get("/get", getCart);
router.post("/updatecart/", UpdateCart);
router.post("/addtocart/", addToCart);
router.delete("/removefromcart/:id", removeCart);
module.exports = router;
