const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

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
    const regiesteredUser = await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
      expiresIn: "24h",
    });

    // Return user details (excluding password) and the token
    return { user: regiesteredUser, token };
  } catch (error) {
    throw new Error(error);
  }
}

async function loginUser(email, password) {
  const user = await UserModel.findOne({ email });
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

async function verifyUser(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error("Token expired");
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error("Invalid token");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

module.exports = {
  registerUser,
  isUserExists,
  loginUser,
  verifyUser,
};
