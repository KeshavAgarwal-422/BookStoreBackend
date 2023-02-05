const { hashSync, compareSync } = require("bcryptjs");
const User = require("../model/User");

const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log();
  }

  if (!users) {
    return res.status(404).json({ message: "No users exist" });
  }

  return res.status(201).json({ users });
};

const getUserById = async (req, res, next) => {
  let user;
  const id = req.params.userId;

  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  return res.status(201).json({ user });
};
const signup = async (req, res, next) => {
  let users;

  const { name, email, password, books } = req.body;

  const hashedPassword = hashSync(password);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists ...login instead" });
  }

  try {
    users = new User({
      name: name,
      email: email,
      password: hashedPassword,
      books: [],
    });
  } catch (err) {
    console.log(err);
  }

  await users.save();

  if (!users) {
    return res.status(404).json({ message: "Error signing up..." });
  }

  return res.status(201).json({ users, id: users._id });
};

const login = async (req, res, next) => {
  let existingUser;

  const { email, password } = req.body;

  if ((!email && email.trim() === "") || (!password && password.length < 6)) {
    return res.status(440).json({ message: "Invalid data..." });
  }

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(440).json({ message: "No user found" });
  }

  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(201)
    .json({ id: existingUser._id, message: "Login successful" });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
