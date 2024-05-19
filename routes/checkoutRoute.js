const expres = require("express");
const router = expres.Router();
const {
  placeOrder

} = require("../controllers/order_controller");
const validateToken = require("../middleware/vaidate_bearer");
router.use(validateToken);
router.post("/order", placeOrder);
module.exports = router;
