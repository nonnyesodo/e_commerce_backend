const express = require("express");
const app = express();
const multer = require('multer');
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const errorHandler = require("./middleware/error_handler");
const bodyParser = require("body-parser");
  
const port = process.env.PORT || 8000;
connectDb();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));
app.use("/api/user", require("./routes/authRoute"));
app.use("/api/user/product", require("./routes/productRoute"));
app.use("/api/user/cart", require("./routes/cartRoutes"));
app.use("/api/user/", require("./routes/checkoutRoute"));
app.use(errorHandler);
app.listen(port, () => {
  console.log("sever running on", port);
});
