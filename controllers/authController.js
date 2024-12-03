const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../model/userModel");

const register = async (req, res, next) => {
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

  const { username } = user;

  res.json({
    token,
    user: {
      username,
      email,
    },
  });
};

const getCurrent = async (req, res, next) => {
  const { username, email } = req.user;

  res.json({
    username,
    email,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(200).send();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
