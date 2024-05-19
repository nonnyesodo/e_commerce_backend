const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "please add the firstname"],
    },
    lastname: {
      type: String,
      required: [true, "please add the lastname"],
    },
    email: {
      type: String,
      required: [true, "please add the email"],
    },
    password: {
      type: String,
      required: [true, "please add the phone"],
    
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
