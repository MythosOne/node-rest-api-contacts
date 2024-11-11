const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ctrlWrapper } = require("../helpers");
const { registerSchema, loginSchema } = require("../model/userModel");
const { User } = require("../model/userModel");

const register = async (req, res, next) => {
  const error = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

const login = async () => {};

const logout = async () => {};

module.exports = {
  register: ctrlWrapper(register),
};
