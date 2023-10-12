const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

async function isUserExists(phone_number) {
  const existingUser = await UserModel.findOne({ phone_number });
  return !!existingUser; // true if the email is taken, false if it's not
}

async function registerUser(name, email, password, phone_number) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({
    name,
    email,
    password: hashedPassword,
    phone_number,
    verified: false,
  });

  try {
    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
}

async function loginUser(email, password) {
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
    expiresIn: "24h",
  });

  // Return user details (excluding password) and the token
  return { user, token };
}

module.exports = {
  registerUser,
  isUserExists,
  loginUser,
};
