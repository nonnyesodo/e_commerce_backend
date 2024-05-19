const asyncHandler = require("express-async-handler");
const User = require("../models/auth_model");
const jwt = require("jsonwebtoken");
const bcrpt = require("bcrypt");
//@desc Login
//@route POST /api/login
//@access public
const login = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = await req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("fields required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Invalid credentials");
  }
  const samePass = await bcrpt.compare(password, user.password);
  if (user && samePass) {
    const accessToken = jwt.sign(
      { user: { email: user.email, id: user.id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .json({
        bearer: accessToken,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      });
  } else {
    res.status(401);
    throw new Error("email or password not valid");
  }
});

//@desc resgister
//@route PUT /api/register
//@access public
const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = await req.body;
  if (!firstname || !lastname || !password || !email) {
    res.status(404);
    throw new Error("Fields is required");
  }
  const avaivalable = await User.findOne({ email });
  if (avaivalable) {
    res.status(404);
    throw new Error("email exist");
  }
  const hashPassword = await bcrpt.hash(password, 10);
  console.log("new passk", hashPassword);
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });
  console.log(newUser);
  if (newUser) {
    const accessToken = jwt.sign(
      { user: { username: User.username, email: User.email, id: User.id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      bearer: accessToken,
    });
  } else {
    res.status(400);
    throw new console.error("user data not valid");
  }
});

module.exports = { login, register };
