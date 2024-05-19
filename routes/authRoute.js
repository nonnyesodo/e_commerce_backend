const expres = require("express");
const router = expres.Router();
const { login, register } = require("../controllers/auth_controller");
router.post("/register", register);
router.post("/login", login);
module.exports = router;
