import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asynchandler.js";
import generateToken from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, username, dept, password } = req.body;

  // const existingUser = await User.findOne({ email, username });
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    username,
    dept,
    password,
  });

  if (user) {
    const token = generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      lvl1: user.lvl1,
      dept: user.dept,
      isAdmin: user.isAdmin,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  // const user = await User.findOne({ email });

  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      isAdmin: user.isAdmin,
      role: user.role,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("use a valid email and password");
  }
};

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(201).json({ message: " logged Out Succesfully" });
});

export const allUsers = async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.status(201).json({ count: users.length, users });
  } else {
    res.json("No Users");
  }
};
