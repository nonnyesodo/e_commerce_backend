const expres = require("express");
const router = expres.Router();
const { addProduct, getProduct } = require("../controllers/product_controller");
const upload = require("../middleware/image_upload");
const validateToken = require("../middleware/vaidate_bearer");
router.post("/add", upload.array("image", 5), addProduct);
router.get("/fetch", validateToken, getProduct);

module.exports = router;
