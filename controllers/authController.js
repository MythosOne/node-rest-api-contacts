const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../helpers");
// const { schemas } = require("../model/userModel");
const { User } = require("../model/userModel");

const register = async (req, res, next) => {
  // const { error } = schemas.registerSchema.validate(req.body);

  // if (error) {
  //   const message =
  //     process.env.NODE_ENV === "production"
  //       ? "Missing required fields"
  //       : error.details[0].message;
  //   throw HttpError(400, message);
  // }

  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw HttpError(409, "User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const login = async (req, res, next) => {
  // const { error } = schemas.loginSchema.validate(req.body);

  // if (error) {
  //   const message =
  //     process.env.NODE_ENV === "production"
  //       ? "Missing required field email"
  //       : error.details[0].message;
  //   throw HttpError(400, message);
  // }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    userId: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1w" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {token: null})

  res.status(200).send();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
